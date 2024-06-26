import { Params, useMatches } from "react-router-dom";

interface IMatches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: unknown;
}

type HandleType = {
  crumb: (param?: string) => React.ReactNode;
};

export const Breadcrumbs = () => {
  const matches: IMatches[] = useMatches();
  const crumbs = matches
    .filter((match) => Boolean((match.handle as HandleType)?.crumb))
    .map((match) =>
      (match.handle as HandleType).crumb(match.data as string | undefined)
    );

  return (
    <div>
      {crumbs.map((crumb, index) => (
        <span key={index}>{crumb}</span>
      ))}
    </div>
  );
};
