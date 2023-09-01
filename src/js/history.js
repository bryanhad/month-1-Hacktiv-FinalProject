const historyArr = []

const username = localStorage.getItem('username')
const historyElem = document.querySelector('[data-history]')
const historyContainerElem = document.querySelector('[data-history-container]')

export function addHistory(score) {
    const obj = {
        username,
        score
    }
    historyArr.push(obj)

    if (historyArr.length) {
        let tempStrContainer = ''

        localStorage.setItem('histories', JSON.stringify(historyArr))
        const historyy = JSON.parse(localStorage.getItem('histories')) 

        historyArr.forEach((el, i) => {
            const {username, score} = el
            const tempStr = `
                <div class='flex gap-6'>
                    <p>${i +1}</p>
                    <div class='flex-[1] flex justify-between pr-6'>
                        <p>${username}</p>
                        <p>${score}</p>
                    </div>
                </div>
            `
            tempStrContainer += tempStr
        });

 

        historyElem.innerHTML = tempStrContainer

        if (!document.querySelector('[data-reset-button]')) {
            const resetBtn = document.createElement('button')
            resetBtn.innerText = 'RESET HISTORY'
            resetBtn.classList.add('bg-amber-400', 'px-4', 'py-2', 'rounded-md', 'text-white')
            resetBtn.type = 'button'
            resetBtn.dataset.resetButton = true
    
            historyContainerElem.append(resetBtn)

            resetBtn.addEventListener('click', () => {
                historyArr.splice(0,historyArr .length)
                localStorage.removeItem('histories')

                historyElem.innerHTML = 'No History'

            })
        }
    }
}