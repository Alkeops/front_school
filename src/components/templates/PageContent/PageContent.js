import s from "./PageContent.module.scss";
const PREFIX = "page-content";

export const PageContent = ({ children }) => {
  return <div className={s[PREFIX]}>{children}</div>;
};
