function rippleClickEffect(event: MouseEvent) {
  if (!event?.target) return
  const element = event.target as HTMLButtonElement
  const circle = document.createElement('span')
  const diameter = Math.max(element.clientWidth, element.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - (element.offsetLeft + radius)}px`
  circle.style.top = `${event.clientY - (element.offsetTop + radius)}px`
  circle.style.position = 'absolute'
  circle.style.borderRadius = '50%'
  circle.style.transform = 'scale(0)'
  circle.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
  circle.animate([{transform: 'scale(4)', opacity: '0'}], {duration: 600, easing: 'linear'})
  circle.classList.add('ripple')

  const ripple = element.getElementsByClassName('ripple')?.[0]
  if (ripple) {
    ripple.remove()
  }
  element.appendChild(circle)
}

export default rippleClickEffect