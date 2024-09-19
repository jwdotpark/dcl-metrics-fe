export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/docs/api/basics",
      permanent: false,
    },
  }
}

const API = () => {
  return <></>
}

export default API
