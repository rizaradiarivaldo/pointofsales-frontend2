const mix = {
  data () {
    return {
      text: 'Data Not Found!'
    }
  },
  directives: {
    textcolor: {
      bind (element, binding) {
        // console.log(binding.value)
        element.style.color = binding.value
      }
    }
  }
}
export default mix
