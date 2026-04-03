export type BuildWithAiShowcaseCardData = {
  title: string;
  backgroundClassName: string;
  titleClassName: string;
  gridClassName: string;
  minHeightClassName: string;
  imageAlt: string;
  imageSrc?: string;
};

export const BUILD_WITH_AI_SHOWCASE_CARDS: BuildWithAiShowcaseCardData[] = [
  {
    title: "Workshops",
    backgroundClassName: "bg-pastelPink",
    titleClassName: "text-halftonePink",
    gridClassName: "lg:col-span-4 lg:row-span-2 lg:col-start-1 lg:row-start-1",
    minHeightClassName: "min-h-[24rem] sm:min-h-[27rem] lg:min-h-[36rem]",
    imageAlt: "Workshop scene placeholder",
    imageSrc: "/gallery/buildwithai-1832.JPG",
  },
  {
    title: "Conference",
    backgroundClassName: "bg-pastelYellow",
    titleClassName: "text-halftoneYellow",
    gridClassName: "lg:col-span-8 lg:col-start-5 lg:row-start-1",
    minHeightClassName: "min-h-[18rem] sm:min-h-[20rem] lg:min-h-[18rem]",
    imageAlt: "Conference scene placeholder",
    imageSrc: "/gallery/buildwithai-1825.JPG",
  },
  {
    title: "Hackathons",
    backgroundClassName: "bg-pastelGreen",
    titleClassName: "text-halftoneGreen",
    gridClassName: "lg:col-span-4 lg:col-start-5 lg:row-start-2",
    minHeightClassName: "min-h-[18rem] sm:min-h-[20rem] lg:min-h-[18rem]",
    imageAlt: "Hackathon scene placeholder",
    imageSrc: "/gallery/buildwithai-1773.JPG",
  },
  {
    title: "Networking",
    backgroundClassName: "bg-pastelBlue",
    titleClassName: "text-halftoneBlue",
    gridClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-2",
    minHeightClassName: "min-h-[18rem] sm:min-h-[20rem] lg:min-h-[18rem]",
    imageAlt: "Private networking scene placeholder",
    imageSrc: "/gallery/buildwithai-1841.JPG",
  },
];
