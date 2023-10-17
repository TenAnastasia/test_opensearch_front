import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getData } from "../../services/services";
import { DataContext } from "../../context/dataContext";
import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPageHeader,
  EuiProvider,
  EuiLoadingSpinner,
} from "@elastic/eui";
import s from "./main.module.scss";
import { TablePage } from "../tablePage/tablePage";
import { JsonPage } from "../jsonPage/jsonPage";

export const MainPage = () => {
  const { setPosts, loading, showLoader, hideLoader, postsData } =
    useContext(DataContext);
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    if (location.pathname.includes("json")) {
      showLoader();
    }
  }, [location]);

  const getPosts = async () => {
    const res = await getData();
    await setPosts(res.data);
  };
  useEffect(() => {
    showLoader();
    try {
      getPosts();
    } catch (e) {
      console.log(e);
    } finally {
      hideLoader();
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
        }}
      >
        <EuiLoadingSpinner size="xxl" />
      </div>
    );
  }

  return (
    <EuiProvider colorMode="light">
      <EuiPageHeader
        className={s.myClass__nav}
        pageTitle="Page title"
        tabs={
          location.pathname === "/"
            ? [
                {
                  label: (
                    <button onClick={() => setIsSelected(false)}>JSON</button>
                  ),
                  isSelected: !isSelected,
                },
                {
                  label: (
                    <button onClick={() => setIsSelected(true)}>TABLE</button>
                  ),
                  isSelected: isSelected,
                },
              ]
            : [
                {
                  label: (
                    <Link to="/" onClick={() => setIsSelected(true)}>
                      TABLE
                    </Link>
                  ),
                },
              ]
        }
        description={
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiStat title={postsData.length} description="Total data" />
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
      <Outlet />
      {location.pathname === "/" && (
        <div>{isSelected ? <TablePage /> : <JsonPage />}</div>
      )}
    </EuiProvider>
  );
};