import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import NoSSR from "./NoSSR";
import InterfaceSelect from "./InterfaceSelect";
import InterfaceContent from "./InterfaceContent";
import InterfaceCode from "./InterfaceCode";

function InterfaceMain({ files, steps }) {
  const router = useRouter()
  const segments = router.asPath.split('#')
  let stepSlug = segments[1] ? segments[1] : 'start'
  const hasStep = steps.findIndex(step => step.slug === stepSlug) > -1
  if (!hasStep) {
    stepSlug = 'start'
    // TODO: remove unfound hash from url
  }
  const [content, setContent] = useState(steps.find(step => step.slug === stepSlug))
  useEffect(() => {
    const onHashChangeStart = (url) => {
      const hash = url.split('#')[1]
      setContent(steps.find(step => step.slug === hash))
    };
    router.events.on("hashChangeStart", onHashChangeStart);
    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events, steps]);
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <NoSSR>
            <InterfaceSelect tutorialSlug={segments[0]} stepSlug={stepSlug} steps={steps} />
            <InterfaceContent content={content} />
          </NoSSR>
        </div>
        <div className="col-span-2">
          <NoSSR>
            <InterfaceCode files={files} active={content.frontmatter.file} key={`${content.frontmatter.file}-${content.frontmatter.focus}`} focus={content.frontmatter.focus} />
          </NoSSR>
        </div>
      </div>
    </>
  )
}

export default InterfaceMain
