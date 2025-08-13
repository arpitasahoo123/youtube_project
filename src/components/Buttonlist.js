import Button from "./Button";
const Buttonlist = () => {
  const list = ["All","Gaming","Songs","Live","Soccer","Cricket","News","Cooking"];
  return(
    <div className="flex">
      {/* <Button name="All"/>
      <Button name="Gaming"/>
      <Button name="Songs"/>
      <Button name="Live"/>
      <Button name="Soccer"/>
      <Button name="Cricket"/>
      <Button name="News"/>
      <Button name="Cooking"/> */}
      {
        list.map((res)=>{
          return(
            <Button key={res} name={res}/>
          )
        })
      }
    </div>
  )
}

export default Buttonlist;