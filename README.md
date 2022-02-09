# drag-n-drop-logo

<strong>Best if used in Chrome</strong> <img style="width:15px" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png" />

A drag and drop logo game to match the colors to where they should go in the logo. 
Drag and Drop logo journal

<h1>Captain's Log</h1>

<h2>Feb 5</h2>
17:30 Given the initial challenge for logo drag and drop game. Initial research shows that HTML has an API that utilizes drag and drop events. Will probably try to utilize that. Reference. Bonus, it also seems to support most browsers:
<br/><a href="https://www.w3schools.com/html/html5_draganddrop.asp" target="_blank">w3 Schools Reference</a><br>
<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API" target="_blank">Mozilla Reference</a>

It looks like it works by having allowable “divs” to drag the element into. So I’ll probably create 6 primary divs. 5 draggable divs for the circles, and one main div for the logo itself. 

Actually, it looks like you drag and drop the image element itself into the correct div. So will probably use a structure like this:

```
<div class=”logo”>
	<img class=”logo__circle blue” />
	<img class=”logo__circle red” />
	<img class=”logo__circle green” />
	<img class=”logo__circle black” />
	<img class=”logo__circle black” />
	<div class=”logo__image”>
		<div class=”logo__image__area”></div>
		<div class=”logo__image__area”></div>
		<div class=”logo__image__area”></div>
		<div class=”logo__image__area”></div>
		<div class=”logo__image__area”></div>
	</div>
</div>
```

For the JavaScript, I’ll probably store the circles and the accepted areas in an array or object, and target the index of each element that has the same class to match the index of the acceptable area by adding the events in JS.

<h2>Feb 6</h2>
11:14 Found some another resource on Friday for the HTML drag and drop events. Going to use those today to help get me started.<br/>
<a href="https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js" target="_blank">How to create drag and drop elements</a>

12:05: Adding some simple styles right now for dragging the circles when they enter and leave the drop area. 

14:04: Managed to get the drag and drop events to kind of work so that they are able to be dropped in the correct area. But I’m getting some style issues. Drag and drop events are very particular and you need to be very specific in what you want it to do. Which I think is good, because it allows for more customization, if needed. 

16:28: Got some styling done. The drag and drop functionality is working now and I added a ‘shake’ animation when the user puts the circle in the wrong spot. I’m going to implement some more error handling such as a message, and an error counter. If they get it right on the first try, maybe add some confetti css so they can feel good about themselves, because they did a good job. Oh, also need a reset button. 

17:09 Added a reset button and ‘Mistakes’ counter. Some things I’m going to try adding:
Success animation - Make image large, back to normal, then spin
Success animation (0 mistakes)
Show answers joke button

18:32: Added Sweet Alert for error handling and correct messaging because it’s pretty universal and it has good customization. No need for me to reinvent the wheel. Things to do:
Stylize the “controls” section where the reset button and mistakes counter sits. 
Add title to page
Fix some funky css with circles that’s going on

<h2>Feb 7</h2>
17:30 Working on using some styles found on the main website and giving a game a story. Still need to work on my previous todo items. I keep getting distracted by new ideas. 

18:42 Managed to borrow some styles and fonts used on the main site to add to this one. I also moved the ‘Mistakes’ counter and ‘Reset’ button to be under the story because it looks a bit nice, I think. It also works because it stacks on top of the old logo when on smaller screens.
 
19:13 Got some things crossed off my list. I tried adding confetti CSS to the page after completion and it turned on my computer fans, so I’m axing that idea. Think I’m done for the night. Things I finished:
Stylize the “controls” section where the reset button and mistakes counter sits. 
Add title to page
Fix some funky css with circles that’s going on

<h2>Feb 8</h2>
18:01 Some components referenced in the main JS file are directly embedded in the HTML page. So in the hypothetical situation if someone wanted to insert this game into a different page, the code would break. So I added some try catch statements to resolve those issues and console log how to fix them.

I also added some style to the button to match the main site. I think it looks better.

18:41 Added comments to my code so hopefully it makes sense to others my reasoning for why I did things the way I did

19:09 I made some things a little more accessibility friendly by adding alt tags to images, and using more consistent tags in my html, like removing my temporary h3 to make my text bigger. 

<h2>Feb 9</h2>
7:01 Last night, I thought I was finished, but I found a bug that allowed the same colored circles to be dropped in the same area. So I made a fix for that this morning. Each area has an index, when a circle is dropped in that area, I store the area index in an array so that it can be checked later if it exists. Seems to work pretty well. 

I think I’m done. Will probably realize I missed something after I submitted.
