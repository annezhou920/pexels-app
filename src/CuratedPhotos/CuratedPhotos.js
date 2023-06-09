import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { useSearchParams } from "react-router-dom";

import Photo from "../Photo/Photo";
import { useCuratedPhotos, useSearchPhotos } from "./hooks";
import "./curatedPhotos.scss";

function CuratedPhotos() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const pageQueryParam = searchParams.get("page");
  const queryQueryParam = searchParams.get("query");
  const [page, setPage] = useState(Number(pageQueryParam) || 1);
  const [query, setQuery] = useState(queryQueryParam || "");

  const { status, data, error, isPreviousData } = useCuratedPhotos({
    query,
    page,
  });

  const {
    status: searchStatus,
    data: searchPhotoData,
    error: searchError,
    isPreviousData: searchPreviousData,
    refetch,
  } = useSearchPhotos({ query, page });

  useEffect(() => {
    // ensure page and query params are getting updated when user navigates via browser history
    if (pageQueryParam && queryQueryParam) {
      setPage(Number(pageQueryParam));
      setQuery(queryQueryParam);
    } else if (pageQueryParam) {
      setPage(Number(pageQueryParam));
    } else {
      setPage(1);
    }
  }, [pageQueryParam, queryQueryParam]);

  const queryStatus = query ? searchStatus : status;
  const queryErr = query ? searchError : error;
  const queryRes = query ? searchPhotoData : data;
  const prevData = query ? searchPreviousData : isPreviousData;

  const handleChange = debounce((e) => {
    e.preventDefault();
    setSearchParams({ query: e.target.value, page: 1 });
    setQuery(e.target.value);
    setPage(1);
  }, 500);

  const handleSearch = async () => {
    await refetch();
    setSearchParams({ page: 1 });
    setPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handlePrev = () => {
    const newPage = page === 1 ? 1 : page - 1;
    setPageParams(newPage);
  };

  const handleNext = () => {
    if (!prevData && queryRes.next_page) {
      const newPage = page + 1;
      setPageParams(newPage);
    }
  };

  const setPageParams = (newPage) => {
    if (query) {
      setSearchParams({ page: newPage, query });
    } else {
      setSearchParams({ page: newPage });
    }
    setPage(newPage);
  };

  const renderPhotos = () => {
    if (queryStatus === "loading") {
      return <span>Loading...</span>;
    }

    if (queryStatus === "error") {
      return <span>Error: {queryErr.message}</span>;
    }

    if (!queryRes?.photos?.length) return <p>Oops. We found no results.</p>;

    return (
      <div className="photosContainer">
        {queryRes &&
          queryRes.photos.map((photo) => (
            <Photo photo={photo} key={photo.id} />
          ))}
      </div>
    );
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <p>Current Page: {page}</p>
        <div className="paginationButtons">
          {page > 1 && (
            <button className="paginationButton" onClick={handlePrev}>
              ❮
            </button>
          )}
          <button
            className="paginationButton"
            onClick={handleNext}
            disabled={!queryRes || !queryRes.next_page}
          >
            ❯
          </button>
        </div>
      </div>
    );
  };

  const renderSearchBar = () => {
    return (
      <input
        placeholder="Search..."
        className="searchBar"
        type="search"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        defaultValue={query}
      />
    );
  };

  return (
    <div className="curatedPhotos">
      {renderPagination()}
      {renderSearchBar()}
      {renderPhotos()}
    </div>
  );
}

export default CuratedPhotos;
