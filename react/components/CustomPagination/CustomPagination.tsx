import React, { useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";
import { canUseDOM } from "vtex.render-runtime";
import { FiChevronDown } from "react-icons/fi"
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai"
import styles from "./CustomPagination.css";
import isCollectionPage from "../../utils/isCollectionPage";

const CustomPagination = () => {
  if (!canUseDOM) return <></>

  const { searchQuery, maxItemsPerPage, page, map } = useSearchPage();

  const [open, setOpen] = useState(false)
  const MAX_PER_PAGE = maxItemsPerPage ? maxItemsPerPage : 24;
  const search = window.location.search;
  const pathName = window.location.pathname;
  const href = window.location.href
  const numberOfProdutsFound = isCollectionPage("collection")
    ? searchQuery.data.productSearch?.recordsFiltered
    : searchQuery?.recordsFiltered;
  let pages = Math.ceil(numberOfProdutsFound / MAX_PER_PAGE);
  if (pages > 10) {
    pages = 10;
  }

  useEffect(() => {
    if (search === "") {
      const scroll = document.documentElement.scrollTop || document.body.scrollTop
      const data = {
        scroll,
        map
      }
      setCookie("scroll", JSON.stringify(data), 5);
    }

    setTimeout(() => {
      if (getCookie("scroll") && pages && JSON.parse(getCookie("scroll") ?? "").map === map) {
        document.documentElement.scrollTop = document.body.scrollTop = parseInt(JSON.parse(getCookie("scroll") ?? "").scroll);
      }
    }, 0);

  }, [href]);

  const removeCookie = () => {
    deleteCookie("scroll")
  }

  const finalUrl = (toPage: number) => {
    const urlCortada = search.split("&");
    const urlSemPage = urlCortada.filter((item) => !item.includes("page"));
    let urlPageVerify: any = [];

    if (urlSemPage.length > 1) {
      urlSemPage.forEach((element) => {
        urlPageVerify.push(element.concat("&"));
      });
    } else {
      urlPageVerify = urlSemPage;
    }

    if (search.includes("?")) {
      const urlNovoPage = urlPageVerify.concat(`&page=${toPage}`);
      const urlFinalProduto = urlNovoPage.join("");
      return pathName.concat(urlFinalProduto);
    } else {
      const urlNovoPage = urlPageVerify.concat(`?page=${toPage}`);
      const urlFinalProduto = urlNovoPage.join("");
      return pathName.concat(urlFinalProduto);
    }
  };

  const changePage = (toPage: number) => {
    window.location.href = finalUrl(toPage);
  }

  const getPages = () => {
    const arr = Array.from({ length: pages + 1 }, (_x, i) => i);
    arr.shift()
    return arr
  }

  const modifyClass = (arrow: string) => {
    let className

    if (arrow === "left") {
      className = styles.arrowLeft
    } else {
      className = styles.arrowRight
    }

    if (arrow === "left" && page === 1 || arrow === "right" && page === pages) {
      className = className + " " + styles.arrowDisable;
    }

    return className;
  };

  if (numberOfProdutsFound < 1)
    return <></>

  return (
    <div className={styles.containerPagination}>
      <ul className={styles.pagination}>
        <li className={styles.buttonPrevContainer}>
          <a
            href="javascript:void(0)"
            onClick={() => {
              page === 1 ? null : changePage(page - 1),
                removeCookie()
            }
            }
            className={styles.buttonPrev}
          >
            <AiOutlineCaretLeft size={20} className={modifyClass("left")} color="#000000" />
          </a>
        </li>

        <li className={styles.paginationMiddle} onClick={() => { setOpen(!open), removeCookie() }}>
          <p className={styles.pagination__item}>
            Página {page} de {pages ? pages : "loading..."}
          </p>
          <FiChevronDown className={styles.paginationArrowDown} size={20} />

          <div className={styles.paginationPages} style={open ? { display: "flex" } : { display: "none" }}>
            <div className={styles.paginationPagesWrapper}>
              {getPages().map((item) => {
                return (
                  <span className={styles.paginationText} onClick={() => {
                    if (item === page) {
                      null
                    } else {
                      changePage(item)
                      removeCookie()
                    }
                  }}>página {item}</span>
                )
              })}
            </div>
          </div>
        </li>

        <li className={styles.buttonNextContainer}>
          <a
            href="javascript:void(0)"
            onClick={() => {
              page === pages ? null : changePage(page + 1),
                removeCookie()
            }
            }
            className={styles.buttonNext}
          >
            <AiOutlineCaretRight size={20} className={modifyClass("right")} color="#000000" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export { CustomPagination };
