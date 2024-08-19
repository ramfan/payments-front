import { Layout } from "antd";
import "./styles.scss";

export const MainLayout: FCC = ({ children }) => {
  return (
    <Layout className="layout">
      <Layout.Content className="main-page-container">
        {children}
      </Layout.Content>
    </Layout>
  );
};
