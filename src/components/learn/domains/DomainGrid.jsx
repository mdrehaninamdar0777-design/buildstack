import DomainCard from "./DomainCard";

export default function DomainGrid({ domains }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {domains.map((domain) => (
        <DomainCard
          key={domain.id}
          domain={domain}
        />
      ))}
    </div>
  );
}