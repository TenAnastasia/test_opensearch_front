import React, { useEffect, useState } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import { Link, useParams } from "react-router-dom";
import { getOneData } from "../../../services/services";
import { EuiCard, EuiFlexGroup } from "@elastic/eui";

export const DocPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getPost = async () => {
    const res = await getOneData(id);
    setData(res.data._source);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <EuiFlexGroup gutterSize="l">
        <EuiCard
          title="Name"
          description={
            <Link to={`/?field=name&query=${data.name}`}>
              <p>{data.name}</p>
            </Link>
          }
        />
        <EuiCard
          title="Email"
          description={
            <Link to={`/?field=email&query=${data.email}`}>
              <p>{data.email}</p>
            </Link>
          }
        />
        <EuiCard
          title="Text"
          description={
            <Link to={`/?field=body&query=${data.body}`}>
              <p>{data.body}</p>
            </Link>
          }
        />
      </EuiFlexGroup>
    </div>
  );
};