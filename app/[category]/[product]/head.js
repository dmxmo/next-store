import DefaultHeadTags from "@/app/DefaultHeadTags";
import { startCase } from "lodash";

export default function Head({ params }) {
  let title = params.product.split('_');
  title.splice(1, 1);

  title = startCase(title)
  return (
    <>
      <title>{title}</title>
      <DefaultHeadTags />
    </>
  )
}
