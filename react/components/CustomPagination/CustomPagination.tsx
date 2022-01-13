import React, { useState } from "react";
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";
import { canUseDOM } from "vtex.render-runtime";
import styles from "./CustomPagination.css";
import isCollectionPage from "../../utils/isCollectionPage";



const CustomPagination = () => {
  const { searchQuery, maxItemsPerPage, page } = useSearchPage();
  const [open, setOpen] = useState(false)
  // const MAX_ITEMS = props.maxPagesVisible ? props.maxPagesVisible : 5;
  const MAX_PER_PAGE = maxItemsPerPage ? maxItemsPerPage : 24;
  // const MAX_LEFT = (MAX_ITEMS - 1) / 2;
  const url = canUseDOM ? window.location.search : "";
  const pathName = canUseDOM ? window.location.pathname : "";
  const numberOfProdutsFound =
    canUseDOM && isCollectionPage("collection")
      ? searchQuery.data.productSearch?.recordsFiltered
      : searchQuery?.recordsFiltered;
  const pages = Math.ceil(numberOfProdutsFound / MAX_PER_PAGE);

  // const firstPage = () => {
  //     if (pages < MAX_ITEMS) return 1;
  //     else if (Math.trunc(Math.max(page - MAX_LEFT, 1)) + MAX_ITEMS <= pages)
  //         return Math.trunc(Math.max(page - MAX_LEFT, 1));
  //     else return Number(pages - MAX_ITEMS + 1);
  // };

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

  function changePage(toPage: number) {
    if (canUseDOM) window.location.href = finalUrl(toPage);
  }


  const getPages = () =>{
    const arr = Array.from({length: pages + 1}, (_x,i) => i);
    arr.shift()

    return arr
  }

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
            <img src={require("./svg/arrowLeft.svg")}></img>
          </a>
        </li>
        <div className={styles.paginationMiddle} onClick={() => setOpen(!open)}>
          <p className={styles.pagination__item}>
            Página {page} de {pages}
          </p>
          <p className={styles.icon}>icon</p>

          {open && (
            <div className={styles.paginationPages}>
              {getPages().map((item) =>{
                return(
                  <span onClick={() =>  item === page ? null : changePage(item)}>{item}</span>
                )
              })}
            </div>
          )}
        </div>
        
        <li className={styles.buttonNextContainer}>
          <a
            href="javascript:void(0)"
            onClick={() =>
              page === pages ? null : changePage(page + 1)
            }
            className={styles.buttonNext}
          >
            <img src={require("./svg/arrowRight.svg")}></img>
          </a>
        </li>
      </ul>
    </div>
  );
};

export { CustomPagination };
