import React, { useState, useEffect } from "react";
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";
import { canUseDOM } from "vtex.render-runtime";
import { FiChevronDown } from "react-icons/fi"
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai"
import styles from "./CustomPagination.css";
import isCollectionPage from "../../utils/isCollectionPage";

const CustomPagination = () => {
  if (!canUseDOM) return <></>

  const { searchQuery, maxItemsPerPage, page } = useSearchPage();
  const [open, setOpen] = useState(false)
  const MAX_PER_PAGE = maxItemsPerPage ? maxItemsPerPage : 24;
  const url = window.location.search;
  const pathName = window.location.pathname;
  const search = window.location.search
  const href = window.location.href
  const numberOfProdutsFound =
    canUseDOM && isCollectionPage("collection")
      ? searchQuery.data.productSearch?.recordsFiltered
      : searchQuery?.recordsFiltered;
  const pages = Math.ceil(numberOfProdutsFound / MAX_PER_PAGE);

  useEffect(() => {
    if(search === ""){
      const scroll = document.documentElement.scrollTop || document.body.scrollTop
      if(localStorage.getItem("scroll")){
        localStorage.removeItem("scroll");
        localStorage.setItem("scroll", scroll.toString());
      }
      localStorage.setItem("scroll", scroll.toString());
    }

    if(search.length < 7) localStorage.removeItem("scroll")

  }, [href]);

  console.log(search.length, search.length < 7)

  setTimeout(() => {
    if (localStorage.getItem("scroll") && pages) {
      document.documentElement.scrollTop = document.body.scrollTop = parseInt(localStorage.scroll);
    }
  }, 0);

  const finalUrl = (toPage: number) => {
    const urlCortada = url.split("&");
    const urlSemPage = urlCortada.filter((item) => !item.includes("page"));
    let urlPageVerify: any = [];

    if (urlSemPage.length > 1) {
      urlSemPage.forEach((element) => {
        urlPageVerify.push(element.concat("&"));
      });
    } else {
      urlPageVerify = urlSemPage;
    }

    if (url.includes("?") && url.length > 7) {
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
    if (canUseDOM) window.location.href = finalUrl(toPage);
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

  return (
    <div className={styles.containerPagination}>
      <ul className={styles.pagination}>
        <li className={styles.buttonPrevContainer}>
          <a
            href="javascript:void(0)"
            onClick={() =>
              page === 1 ? null : changePage(page - 1)

            }
            className={styles.buttonPrev}
          >
            <AiOutlineCaretLeft size={20} className={modifyClass("left")} color="#000000" />
          </a>
        </li>

        <li className={styles.paginationMiddle} onClick={() => setOpen(!open)}>
          <p className={styles.pagination__item}>
            Página {page} de {pages ? pages : "loading..."}
          </p>
          <FiChevronDown className={styles.paginationArrowDown} size={20} />
          {open && (
            <div className={styles.paginationPages}>
              <div className={styles.paginationPagesWrapper}>
                {getPages().map((item) => {
                  return (
                    <span className={styles.paginationText} onClick={() => item === page ? null : changePage(item)}>página {item}</span>
                  )
                })}
              </div>
            </div>
          )}
        </li>

        <li className={styles.buttonNextContainer}>
          <a
            href="javascript:void(0)"
            onClick={() =>
              page === pages ? null : changePage(page + 1)
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
