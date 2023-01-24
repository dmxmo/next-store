import DefaultHeadTags from "@/app/DefaultHeadTags";
import { startCase } from "lodash";

export default function Head({ params }) {
  const title = startCase(params?.category)
  return (
    <>
      <title>{title}</title>
      <DefaultHeadTags />
    </>
  )
}
