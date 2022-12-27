particlesJS.load('particles-js', './js/particlesjs-config.json');

/*
1- click on btn
2- get btn, btns, btn article
3- check if exist in localstorage
    * opened: 
        ** article slideup
        ** btn return small and animated
        ** show other btns
    * closed:
        ** hide other btns
        ** btn larger
        ** article slidedown

*/
localStorage.clear()
const checkTab = () => new Promise((opened, closed)=> {
    let tab = localStorage.getItem('tab')
    if(tab && tab !== 'null') {
        opened(tab)
    } else {
        closed(null)
    }
})
const handleTab = (me) => {
    $(document).ready(function() {
        checkTab()
            .then((tab)=> {
                localStorage.setItem('tab', null)
                $(`#${tab}`).collapse('hide')
                $(me).addClass('removing-article')
                let parentW = $(me).parent().css('width'),
                    childW = $(`button.btn-danger:not(.removing-article)`).css('width'),
                    meW = Math.round((parseFloat(childW) / parseFloat(parentW)) * 100)

                return [tab, meW]
            })
            .then((data) => {
                $(`#${data[0]}`).on('hidden.bs.collapse', function() {
                    $(me).css({'width': `${data[1]}%`, 'font-size': '1rem'})
                    $(`button.btn-danger:not(.removing-article)`).css({'transform': 'scale(1)', 'display': 'block'})
                    setTimeout(()=>{
                        $('button.btn-danger').addClass('wow').css({'animation-name': 'pulse'})
                        $('.removing-article').removeClass('removing-article')
                    }, 500)
                })
            })
            .catch(()=> new Promise((resolve,reject)=> {
                $(me).addClass('loading-article')
                if($(me).hasClass('loading-article')) {
                    $('button.wow').removeClass('wow').css({'animation-name': 'none'})
                    resolve($(me))
                }
                })
                .then((activebtn)=> {
                    $(`button.btn-danger:not(.loading-article)`).css('transform', 'scale(0)')
                    return activebtn
                })
                .then((activebtn)=> {
                    activebtn.css({'width': '100%', 'font-size': '2rem'})
                    $(`button.btn-danger:not(.loading-article)`).css('display', 'none')
                    activebtn.removeClass('loading-article')
                    return activebtn.data('target')
                })
                .then((tabName)=> {
                    localStorage.setItem('tab', tabName)
                    $(`#${tabName}`).collapse('show')
                })
            )
    })
}



