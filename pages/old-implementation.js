import Head from "next/head";
import VisualizationController from "../components/VisualizationController";

export default function Home() {
  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>WikiLovesMonuments - Data visualization</title>
        <meta
          name="description"
          content="Explore the data about photographed monuments from WikiLovesMonuments, in the data visualization system developed using WikiData."
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta
          itemProp="name"
          content="WikiLovesMonuments - Data visualization"
        />
        <meta
          itemProp="description"
          content="Explore the data about photographed monuments from WikiLovesMonuments, in the data visualization system developed using WikiData."
        />
        <meta
          itemProp="image"
          content="https://data.wikilovesmonuments.it/images/og-image.png"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://data.wikilovesmonuments.it" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="WikiLovesMonuments - Data visualization"
        />
        <meta
          property="og:description"
          content="Explore the data about photographed monuments from WikiLovesMonuments, in the data visualization system developed using WikiData."
        />
        <meta
          property="og:image"
          content="https://data.wikilovesmonuments.it/images/og-image.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="WikiLovesMonuments - Data visualization"
        />
        <meta
          name="twitter:description"
          content="Explore the data about photographed monuments from WikiLovesMonuments, in the data visualization system developed using WikiData."
        />
        <meta
          name="twitter:image"
          content="https://data.wikilovesmonuments.it/images/og-image.png"
        />

        {/* <!-- Meta Tags Generated via http://heymeta.com --> */}
      </Head>
      <VisualizationController />
    </>
  );
}
