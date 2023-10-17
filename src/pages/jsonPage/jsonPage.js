import React, { useContext } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import { DataContext } from "../../context/dataContext";
import { EuiLoadingSpinner, EuiText, EuiTextColor } from "@elastic/eui";
import s from "./jsonPage.module.scss";

export const JsonPage = () => {
  const { postsData, loading } = useContext(DataContext);

  const DocumentComponent = ({ doc }) => {
    return (
      <div key={doc?.id || doc._source.id}>
        <p>{`{`}</p>
        <div style={{ marginLeft: 25 }}>
          <EuiText size="s">
            <p>
              <EuiTextColor color="danger">"id": </EuiTextColor>
              <EuiTextColor color="subdued">
                {doc?.id || doc._source.id},
              </EuiTextColor>
            </p>
          </EuiText>
          <EuiText size="s">
            <p>
              <EuiTextColor color="danger">"name": </EuiTextColor>
              <EuiTextColor color="subdued">
                "{doc?.name || doc._source.name}",
              </EuiTextColor>
            </p>
          </EuiText>
          <EuiText size="s">
            <p>
              <EuiTextColor color="danger">"email": </EuiTextColor>
              <EuiTextColor color="subdued">
                "{doc?.email || doc._source.email}",
              </EuiTextColor>
            </p>
          </EuiText>
          <EuiText size="s">
            <p>
              <EuiTextColor color="danger">"body": </EuiTextColor>
              <EuiTextColor color="subdued">
                "{doc?.body || doc._source.body}",
              </EuiTextColor>
            </p>
          </EuiText>
        </div>
        <p>{`},`}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={s.loading}>
        <EuiLoadingSpinner size="xxl" />
      </div>
    );
  }

  return (
    <div className={s.myCustomClass__json}>
      {postsData.map((post) => (
        <DocumentComponent doc={post} />
      ))}
      {/*{JSON.stringify(postsData)}*/}
    </div>
  );
};