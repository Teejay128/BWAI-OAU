import "server-only";

import {
  PROJECT_TRACK_CATEGORIES,
  WHAT_WAS_BUILT_PROJECTS,
  type Project,
  type ProjectTrackCategory,
} from "@/lib/config";
import { prisma } from "@/lib/prisma";

export type WhatWasBuiltPageData = {
  liveCount: number;
  projects: Project[];
  publicFormEnabled: boolean;
};

export type PublicSubmitPayload = {
  name: string;
  community: string;
  category: ProjectTrackCategory;
  description: string;
  techTags: string[];
  tags: string[];
  demoHref: string;
};

type SavePayload = {
  publicFormEnabled: boolean;
};

export type ToggleLikeResult = {
  projectId: number;
  liked: boolean;
  likes: number;
};

function toProjectCategory(category: string): Project["category"] {
  const match = PROJECT_TRACK_CATEGORIES.find((item) => item === category);
  return match ?? PROJECT_TRACK_CATEGORIES[0];
}

function fallbackData(): WhatWasBuiltPageData {
  return {
    liveCount: WHAT_WAS_BUILT_PROJECTS.length,
    projects: WHAT_WAS_BUILT_PROJECTS,
    publicFormEnabled: false,
  };
}

export async function getWhatWasBuiltPageData(): Promise<WhatWasBuiltPageData> {
  try {
    const config = await prisma.whatWasBuiltConfig.findUnique({
      where: { id: 1 },
      include: {
        projects: {
          orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
        },
      },
    });

    if (!config) {
      return fallbackData();
    }

    const projects = config.projects.map((project: any) => ({
        id: project.id,
        community: project.community,
        tags: project.tags,
        name: project.name,
        description: project.description,
        techTags: project.techTags,
        demoHref: project.demoHref,
        likes: project.likes,
        category: toProjectCategory(project.category),
      }));

    return {
      liveCount: projects.length,
      projects,
      publicFormEnabled: (config as any).publicFormEnabled ?? false,
    };
  } catch {
    return fallbackData();
  }
}

export async function saveWhatWasBuiltPageData(payload: SavePayload): Promise<WhatWasBuiltPageData> {
  await prisma.whatWasBuiltConfig.upsert({
    where: { id: 1 },
    update: { publicFormEnabled: payload.publicFormEnabled },
    create: { id: 1, publicFormEnabled: payload.publicFormEnabled },
  });

  return getWhatWasBuiltPageData();
}

export async function submitPublicProject(data: PublicSubmitPayload): Promise<void> {
  const config = await prisma.whatWasBuiltConfig.findUnique({
    where: { id: 1 },
    select: { id: true },
  }) as any;

  if (!config?.publicFormEnabled) {
    throw new Error("FORM_CLOSED");
  }

  const count = await prisma.whatWasBuiltProject.count({ where: { configId: 1 } });

  await prisma.whatWasBuiltProject.create({
    data: {
      displayOrder: count,
      community: data.community.trim(),
      tags: data.tags.map((t) => t.trim()).filter(Boolean),
      name: data.name.trim(),
      description: data.description.trim(),
      techTags: data.techTags.map((t) => t.trim()).filter(Boolean),
      demoHref: data.demoHref.trim() || "#",
      likes: 0,
      category: toProjectCategory(data.category),
      configId: 1,
    },
  });
}

export async function toggleWhatWasBuiltProjectLike(
  projectId: number,
  deviceId: string,
): Promise<ToggleLikeResult> {
  return prisma.$transaction(async (tx: any) => {
    const project = await tx.whatWasBuiltProject.findUnique({
      where: { id: projectId },
      select: { id: true, likes: true },
    });

    if (!project) {
      throw new Error("Project not found.");
    }

    const existingLike = await tx.whatWasBuiltProjectLike.findUnique({
      where: {
        projectId_deviceId: {
          projectId,
          deviceId,
        },
      },
      select: { id: true },
    });

    if (existingLike) {
      await tx.whatWasBuiltProjectLike.delete({ where: { id: existingLike.id } });

      const updated = await tx.whatWasBuiltProject.update({
        where: { id: projectId },
        data: { likes: { decrement: 1 } },
        select: { likes: true },
      });

      return {
        projectId,
        liked: false,
        likes: Math.max(0, updated.likes),
      };
    }

    await tx.whatWasBuiltProjectLike.create({
      data: {
        projectId,
        deviceId,
      },
    });

    const updated = await tx.whatWasBuiltProject.update({
      where: { id: projectId },
      data: { likes: { increment: 1 } },
      select: { likes: true },
    });

    return {
      projectId,
      liked: true,
      likes: updated.likes,
    };
  });
}
