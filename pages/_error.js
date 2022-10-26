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
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
