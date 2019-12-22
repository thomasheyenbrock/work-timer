import Router from "next/router";
import { NextPage } from "next";
import format from "../utils/format";

const Index: NextPage<{}> = () => null;

Index.getInitialProps = async ({ res }) => {
  const date = format(new Date(), "yyyy-MM-dd");
  if (res) {
    res.writeHead(302, {
      Location: `/${date}`
    });
    res.end();
  } else {
    Router.push("`/${date}`");
  }
};

export default Index;
