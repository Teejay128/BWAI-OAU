import { COMMUNITY_COLORS, TECH_TAG_COLORS, type Project } from "@/lib/config";
import { motion } from "motion/react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { VscThumbsupFilled } from "react-icons/vsc";

function ProjectCard({
    project,
    index,
    isLiked,
    isLiking,
    onToggleLike,
}: {
    project: Project;
    index: number;
    isLiked: boolean;
    isLiking: boolean;
    onToggleLike: (id: number) => Promise<void>;
}) {
    const communityColor = COMMUNITY_COLORS[project.community] ?? "#f2f2f2";

    return (
        <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.08,
            }}
            whileHover={{
                y: -7,
                scale: 1.018,
                boxShadow: "0 28px 64px rgba(30,30,30,0.13)",
                transition: { type: "spring", stiffness: 280, damping: 22 },
            }}
            whileTap={{
                scale: 0.982,
                transition: { duration: 0.1, ease: "easeInOut" },
            }}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.06)]"
        >
            {/* Community + extra tags */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-ink"
                    style={{ backgroundColor: communityColor }}
                >
                    {project.community}
                </span>
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-[#ebebeb] px-3 py-1 text-xs font-medium text-ink/60"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold leading-snug text-ink">{project.name}</h3>

            {/* Description */}
            <p className="mt-2 flex-1 text-sm leading-[1.6] text-ink/65">
                {project.description}
            </p>

            {/* Tech tags */}
            <div className="mt-4 flex flex-wrap gap-2">
                {project.techTags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-ink"
                        style={{ backgroundColor: TECH_TAG_COLORS[tag] ?? "#f2f2f2" }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Card footer */}
            <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
                <Link
                    href={project.demoHref}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors duration-200 hover:text-coreBlue"
                >
                    <FiExternalLink />
                    View Demo
                </Link>
                <motion.button
                    type="button"
                    onClick={() => onToggleLike(project.id)}
                    aria-label={`${isLiked ? "Unlike" : "Like"} ${project.name}`}
                    disabled={isLiking}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.82 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                        isLiked
                            ? "border-coreBlue bg-coreBlue/10 text-coreBlue"
                            : "border-ink/20 bg-transparent text-ink hover:border-ink/40"
                    }`}
                >
                    <VscThumbsupFilled />
                    <span>{project.likes}</span>
                </motion.button>
            </div>
        </motion.div>
    );
}

export default ProjectCard;