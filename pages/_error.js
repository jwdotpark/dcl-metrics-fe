// import * as Sentry from "@sentry/nextjs"
import NextErrorComponent from "next/error"
import Layout from "../src/components/layout/layout"

const CustomErrorComponent = (props) => {
  return (
    <Layout>
      <NextErrorComponent statusCode={props.statusCode} />
    </Layout>
  )
}

CustomErrorComponent.getInitialProps = async (contextData) => {
  // await Sentry.captureUnderscoreErrorException(contextData)
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
