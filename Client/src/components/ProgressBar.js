

const ProgressBar = ({progress}) => {

  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF3"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  return (
      <div className = "outer-bar" >
        <div
        className="inner-bar"
        style={{
          width: `${progress}%`, backgroundColor: randomColor
          }}
          
      ></div>
      </div>
    );
  }
  
  export default ProgressBar;
   