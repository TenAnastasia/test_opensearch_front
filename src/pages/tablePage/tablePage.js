import React, { useContext, useEffect, useState } from "react";
import {
  EuiBasicTable,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiButton,
  EuiPopover,
  EuiSelectable,
} from "@elastic/eui";
import { findPosts } from "./helpers";
import { DataContext } from "../../context/dataContext";
import { getData } from "../../services/services";
import { Link, useSearchParams } from "react-router-dom";
import s from "./tablePage.module.scss";

export const TablePage = () => {
  const { postsData, setPosts } = useContext(DataContext); // данные и установка данных в контекст
  const [pageIndex, setPageIndex] = useState(0); // индекс текущей страницы для отображения в таблице
  const [pageSize, setPageSize] = useState(5); // отображение количества элементов на странице в таблице
  const totalItemCount = postsData.length; // количество элементов в таблице
  const [sortField, setSortField] = useState("id"); // поле сортировки в таблице
  const [sortDirection, setSortDirection] = useState("asc" || "desc"); // направление сортировки
  const [pageOfItems, setPageOfItems] = useState(
    findPosts(postsData, pageIndex, pageSize, sortField, sortDirection),
  ); // данные для отображения текущей страницы в таблице

  const [searchValue, setSearchValue] = useState(""); // значение поля поиска
  const [searchValueSelector, setSearchValueSelector] = useState("name"); // значение поля, в котором происходит поиск
  const [searchParams, setSearchParams] = useSearchParams(); // параметры из url

  const fieldQuery = searchParams.get("field") || "";
  const queryQuery = searchParams.get("query") || "";

  useEffect(() => {
    setPageOfItems(
      findPosts(postsData, pageIndex, pageSize, sortField, sortDirection),
    );
  }, [pageIndex, pageSize, sortDirection, sortField]);

  useEffect(() => {
    getPosts();
  }, [searchParams]);

  const getPosts = async () => {
    setSearchValue(queryQuery);
    if (fieldQuery.length > 0) setSearchValueSelector(fieldQuery);
    const res = await getData(fieldQuery, queryQuery);
    await setPosts(res.data);
    setPageOfItems(findPosts(res.data, 0, 5, "id", "asc"));
  };

  // параметры пагинации
  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [5, 10],
    showPerPageOptions: true,
  };

  // параметры сортировки
  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const onTableChange = ({ page = {}, sort = {} }) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }
  };

  const columns =
    postsData.length > 0 && postsData[0]?._source
      ? [
          {
            field: "_source.id",
            name: "Id",
            sortable: true,
            render: (id) => <Link to={`/table/${id}`}>{id}</Link>,
          },
          {
            field: "_source.name",
            name: "Name",
            sortable: true,
          },
          {
            field: "_source.email",
            name: "email",
            sortable: true,
          },
          {
            field: "_source.body",
            name: "Body",
            sortable: true,
          },
        ]
      : [
          {
            field: "id",
            name: "Id",
            sortable: true,
            render: (id) => <Link to={`/table/${id}`}>{id}</Link>,
          },
          {
            field: "name",
            name: "Name",
            sortable: true,
          },
          {
            field: "email",
            name: "email",
            sortable: true,
          },
          {
            field: "body",
            name: "Body",
            sortable: true,
          },
        ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ field: searchValueSelector, query: searchValue });
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [options, setOptions] = useState([
    { label: "name", checked: "on" },
    { label: "email" },
    { label: "body" },
    { label: "id" },
  ]);
  const onChange = (options) => {
    setOptions(options);
  };

  return (
    <div style={{ padding: 50 }}>
      <form autoComplete={"off"} onSubmit={handleSubmit}>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFieldSearch
              placeholder="Search..."
              fullWidth
              aria-label="An example of search with fullWidth"
              type={"search"}
              name={"search"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </EuiFlexItem>
          <EuiPopover
            panelPaddingSize="none"
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                {searchValueSelector}
              </EuiButton>
            }
            isOpen={isPopoverOpen}
            closePopover={() => {
              setIsPopoverOpen(false);
              const option = options.filter((item) => {
                if (item?.checked === "on") return item.label;
              });
              setSearchValueSelector(option[0].label);
            }}
          >
            <EuiSelectable
              options={options}
              onChange={onChange}
              name={"select"}
            >
              {(list) => <div style={{ width: 240 }}>{list}</div>}
            </EuiSelectable>
          </EuiPopover>
          <EuiFlexItem grow={false}>
            <EuiButton type={"submit"}>Search</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />
      </form>
      <EuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
        sorting={sorting}
        className={s.myCustomClass__table}
      />
    </div>
  );
};
