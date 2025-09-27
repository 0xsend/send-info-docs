export default function ResponsiveTable({ children, ...rest }) {
  return (
    <div className="table-scroll">
      <table {...rest}>{children}</table>
    </div>
  );
}
