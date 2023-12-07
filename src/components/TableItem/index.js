import "./index.css";

const TableItem = (props) => {
  const { data } = props;
  const { id, title, description, category, image } = data;
  let {price} = data 
  const updatedPrice = price.toFixed(2)

  let { sold } = data;
  if (sold === 1) {
    sold = "Sold";
  } else {
    sold = "Not sold";
  }
  return (
    <>
      <li className="tableText">{id}</li>
      <li className="titleText tableText">{title}</li>
      <li className="texts tableText">{description}</li>
      <li className="tableText">{updatedPrice}</li>
      <li className="tableText">{category}</li>
      <li className="tableText">{sold}</li>
      <li className="tableText forBorderNone">
        <img src={image} alt="product" className="image" />
      </li>
    </>
  );
};

export default TableItem;
