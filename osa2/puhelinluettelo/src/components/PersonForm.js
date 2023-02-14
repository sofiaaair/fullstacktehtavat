const PersonForm = ({submitValue, input1, input2, onChange1, onChange2}) => {


return(
<form onSubmit = {submitValue}>
<div>
    name : <input value = {input1}
    onChange = {onChange1}
    /> 
</div>
<div>
  number : <input value = {input2}
  onChange = {onChange2}
  />
</div>
<div>
<button type="submit">add</button>
</div>
</form>
)
}
export default PersonForm