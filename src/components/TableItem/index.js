import "./index.css";

const TableItem = (props) => {
  const { data } = props;
  const { id, title, description, price, category } = data;
  const image = "https://i.ibb.co/C5Cs4Pd/marguerite-729510-1280.jpg";

  let { sold } = data;
  if (sold === 1) {
    sold = "True";
  } else {
    sold = "False";
  }
  return (
    <>
      <li className="tableText">{id}</li>
      <li className="titleText tableText">{title}</li>
      <li className="texts tableText">{description}</li>
      <li className="tableText">{price}</li>
      <li className="tableText">{category}</li>
      <li className="tableText">{sold}</li>
      <li className="tableText">
        <img src={image} alt="product" className="image" />
      </li>
    </>
  );
};

export default TableItem;
