
function injectUI(timelineParent) {
    prevContainer = document.querySelector('#timer-container')
    if (prevContainer != null) {
        // If countdown as expired, leave the container with the message
        paragraphTags = document.querySelectorAll('p')
        if (paragraphTags[1].innerText.startsWith('00:00:00')) {
            return
        }
        prevContainer.remove()
    }

    const container = document.createElement('div')
    container.id = 'timer-container'
    timelineParent.appendChild(container)

    const header = document.createElement('p')
    const headerText = document.createTextNode('Don\'t you have something better to do? 🤔')
    header.appendChild(headerText)
    container.appendChild(header)

    const timer = document.createElement('p')
    const timerString = getTimerString()
    const timerText = document.createTextNode(timerString)
    timer.appendChild(timerText)
    container.appendChild(timer)

    const footer = document.createElement('p')
    const footerText = document.createTextNode('until you can scroll your life away again')
    footer.appendChild(footerText)
    container.appendChild(footer)

    container.style.color = 'white'
    container.style.textAlign = 'center'
    container.style.fontFamily = 'monospace'
    container.style.paddingTop = '20px'
    container.style.fontSize = '20px'
    container.style.lineHeight = '40px'
}

function replaceTimeline() {
    function replaceTimelineRetry() {
        const timeline = document.querySelector(`[aria-label="Timeline: Your Home Timeline"]`)
        // If the site has loaded, remove the timeline and sidebar
        if (timeline == null) {
            return
        } else {
            timeline.style.display = 'none'
        }
        const timelineParent = timeline.parentNode

        // Add container with timer and copy
        injectUI(timelineParent)
    }
    setInterval(replaceTimelineRetry, 1000)
}

function removeSidebar() {
    function removeSidebarRetry() {
        const sidebar = document.querySelector(`[data-testid="sidebarColumn"]`)
        if (sidebar == null) {
            return
        } else {
            sidebar.style.display = 'none'
        }
    }
    setInterval(removeSidebarRetry, 1000)
}

const countDownDate = new Date("Sep 1, 2030 11:00:00")
const end = countDownDate.getHours() * 60 + countDownDate.getMinutes()

function inTime() {
    const now = new Date()
    const time = now.getHours() * 60 + now.getMinutes()
    return time < end
}

function getTimerString() {
    const countDownTime = countDownDate.getTime()
    const now = new Date().getTime()
    const distance = countDownTime - now

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    const timerString = formatNumber(hours) + ':' + formatNumber(minutes) + ':' + formatNumber(seconds)
    const refreshMessage = timerString === '00:00:00' ? '  (refresh the page)' : ''
    return timerString + refreshMessage
}

function formatNumber(num) {
    const s = num + ''
    if (s.length == 0) return '00'
    if (s.length == 1) return '0' + s
    return s
}

removeSidebar()

if (inTime()) {
    replaceTimeline()
}
