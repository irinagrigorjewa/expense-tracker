import { useMatches } from "react-router-dom";

export const Breadcrumbs = () => {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <div>
      {crumbs.map((crumb, index) => (
        <span key={index}>{crumb}</span>
      ))}
    </div>
  );
};
