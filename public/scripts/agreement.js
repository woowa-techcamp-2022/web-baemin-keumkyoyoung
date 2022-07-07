const activeAgreementForm =(form,selectedAllCheckbox)=>{
    const allCheckBoxs = [...form.querySelectorAll('input')].filter(input=>input.type==="checkbox")
    const submitBtn= form.querySelector('button')

    const isAllChecked=()=> allCheckBoxs.every((input)=>input.checked)
    const isAllRequiredCheck = ()=>allCheckBoxs.filter(input=> input.required ).every(input=>input.checked)

    const onChnageHandler = (e)=>{
        console.log(isAllChecked(allCheckBoxs),isAllRequiredCheck(allCheckBoxs))
        if(isAllChecked()){
            submitBtn.disabled = false
            selectedAllCheckbox.checked = true
            console.log(selectedAllCheckbox.checked)
            return
        }

        if(isAllRequiredCheck()){
            submitBtn.disabled = false
            return
         }

        submitBtn.disabled = true
        selectedAllCheckbox.checked = false
    }


    const toggleAll = ({target})=>{
        allCheckBoxs.forEach((inputElement)=>{
            inputElement.checked = target.checked
            submitBtn.disabled = false
        })
    }

    selectedAllCheckbox.addEventListener('change', toggleAll )
    form.addEventListener('change',onChnageHandler)
}

window.addEventListener('load',()=>{
    const form = document.querySelector('form')
    const selectedAllInput = document.querySelector("#select-all")
    activeAgreementForm(form,selectedAllInput)
})
