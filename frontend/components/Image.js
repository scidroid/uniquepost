const Image = ({ onClick, variant, cclassName, circular, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`image-container transition ${variant} ${cclassName} ${
        circular && "circular"
      }`}
    >
      <img {...props} />
    </div>
  );
};

export default Image;
