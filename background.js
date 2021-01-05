console.log("background scripts running");

function buttonClicked()
{
    console.log("This button has been clicked!");
    //Code to scroll the entire active tab webpage
    window.scrollTo({
        top: 0,
        bottom: 100,
        behavior: 'smooth'
      });
    // window.scrollTo(0,document.body.scrollHeight);
    var links=document.getElementsByClassName('uqZtlf x0HGk QRiHXd MymH0d maXJsd'), hrefs = [];
    for (var i = 0; i<links.length; i++)
    {   
        hrefs.push(links[i].href);
    }
    console.log(hrefs);
}
buttonClicked();