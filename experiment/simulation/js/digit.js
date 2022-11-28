/////////////////////Image Slider Variables///////////////////
// Used to add a numeric id on slide creation to let us target the element later
let simsubscreennum = 0;
let temp = 0;
let slideIndex = 0;
let slideIndex1 = 1;
// Tells us which slide we are on
let currentSlideIndex = 0;
let currentSlideIndex1 = 1;
// An Array to hold all the slides
let slideArray = [];
let sampleArray = ["Sample1", "Sample2", "Sample3"];
let sample = null,
  sampleProperties = null;
let sampleSelect = document.getElementById("sampleSelect");
let print = false;
//COLOR-PALLETE
let colorPallete = `<div class="item color-div" >
<div class="color-pallet">
  <div class="color-div" style="background-color: #000000" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #008000" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #90ee90" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #800000" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #a52a2a" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #ffa07a" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #ff0000" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #ffb6c1" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #9acd32" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #808080" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #ffffff" onclick="editColorSetting(this)"></div>
  <div class="color-div" style="background-color: #00ffff" onclick="editColorSetting(this)"></div>
</div>
</div>`;

//Canvas and region and status
let reg = document.getElementById("region");
let canvas = document.getElementById("can");
let ctx = canvas.getContext("2d");

//menus
let ins = document.querySelector("#instructions");
let mapScale = document.getElementById("mapScale");
let newPath = document.getElementById("type");
let selColor = document.querySelector("#selected-color");
let colorDiv = document.querySelectorAll(".color-div");
let markedTrees = document.querySelector("#marked-trees");
let markedRegions = document.querySelector("#marked-regions");
let markedBunds = document.querySelector("#marked-bunds");

//modal contents
let modal = document.querySelector(".modal");
let content = document.querySelector(".content");
let area = document.querySelector("#area");
let save = document.querySelector("#save");

//image
let imageUrl = "./images/dam.JPG";
// let imageScale = "./images/scale2.png";
// let imageUrl2 = "./images/scale2.png";
let image2 = new Image();
// image2.src = imageScale; // a 400 x 400 image

//canvas click variable
let mouseDown = false;

//overall color
let color = "#000000";

//Trees
let treeSample = ["⁕", "•", "×"]; //trees
let trees = [];
let treesArray = [];

//Lines
let linesSample = [
  "<img src='images/l1.png' />",
  "<img src='images/l2.png' />",
  "<img src='images/l3.png' />",
]; //lines
let lines = []; //currentGraphics
let linesArray = []; //array of lines

//Polygons
let points = []; //polygon
let pathsArray = [];
let polygonSet = false;

//sample select
let selectionDone = false;

//for plotting in canvas
let readyToPlot = false;

//to track current plot on canvas
let currentPatternTree, currentPatternLine;
let treeLine = false; //true: tree false: line

//Save polygon and line
let treeName = "";
let regionName = "";
let lineName = "";
let saveTree = false;
let savePolygon = false;
let saveLine = false;

//Table parameters
//Trees
let tableContentTree = "";
let idToEditTree, dataToEditTree, idToDeleteTree;

//Polygons
let tableContentRegion = "";
let idToEditRegion, dataToEditRegion, idToDeleteRegion;

//Lines
let tableContentLine = "";
let idToEditLine, dataToEditLine, idToDeleteLine;

//Overview content
let overviewContent = "";
let treeOverview = "",
  pathOverview = "",
  lineOverview = "";

let features = [
  "The features to be identified are Pier, Fallow land, cropland, Nonscouring bed, Dam, Abutment, Retainment wall, bunds, and river.",
  "The features to be identified are fallow land, ploughed land, house, bund, and tree.",
];

//type effect
let txt = "Boudnary Marked...";
/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- THE TEMPLATE ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/

// Template for creating a custom Slide object
function Slide(title, background, url, scale) {
  this.title = title;
  this.background = background;
  this.url = url;
  this.scale = scale;
  // this.link = link;
  // we need an id to target later using getElementById
  this.id = "sample" + slideIndex;
  // Add one to the index for the next slide number
  slideIndex++;
  // Add this Slide to our array
  slideArray.push(this);
}

/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- SLIDE CREATION ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/

// Creating our slide objects, you can make as many as you want

let Dam = new Slide(
  "Dam",
  "images/dam.JPG",
  "./images/dam.JPG",
  "./images/scale1.png"
);

let Farm = new Slide(
  "Farmland",
  "images/farm.jpg",
  "./images/farm.jpg",
  "./images/scale2.png"
);

/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- ADD TO WEB PAGE ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/

// RGB to HEX values
const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0?1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

function buildSlider() {
  // A letiable to hold all our HTML
  let myHTML = "Loading....";

  // Go through the Array and add the code to our HTML
  slideArray.forEach(function (slider) {
    myHTML +=
      "<div id='" +
      slider.id +
      "' class='singleSlide' style='background-image:url(" +
      slider.background +
      ");'>" +
      "<div class='slideOverlay'>" +
      "</div>" +
      // "<div class='names'>" +
      // slider.title +
      // "</div>" +
      "</div>";
  });
  // Print our HTML to the web page
  document.getElementById("mySlider").innerHTML = myHTML;

  // Display the first slide
  document.getElementById("sample" + currentSlideIndex).style.left = 0;
}

// Create our slider
buildSlider();

/*-----------------------------------------------------------------
-----------------------------------------------------------------
----------------------- SLIDER CONTROLS ---------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/

// Navigates to the previous slide in the list
function prevSlide() {
  if (!selectionDone) {
    // Figure out what the previous slide is
    let nextSlideIndex;
    // If we are at zero go to the last slide in the list
    if (currentSlideIndex === 0) {
      nextSlideIndex = slideArray.length - 1;
    } else {
      // Otherwise the next one is this slide minus 1
      nextSlideIndex = currentSlideIndex - 1;
    }

    // Setup the next slide and current slide for animations
    document.getElementById("sample" + nextSlideIndex).style.left = "-100%";
    document.getElementById("sample" + currentSlideIndex).style.left = 0;

    // Add the appropriate animation class to the slide
    document
      .getElementById("sample" + nextSlideIndex)
      .setAttribute("class", "singleSlide slideInLeft");
    document
      .getElementById("sample" + currentSlideIndex)
      .setAttribute("class", "singleSlide slideOutRight");

    // Set current slide to the new current slide
    currentSlideIndex = nextSlideIndex;
    sampleSelect.value = slideArray[currentSlideIndex].title;
    sampleProperties = slideArray[currentSlideIndex];
    imageUrl = sampleProperties.url;
    imageScale = sampleProperties.scale;
    image2.src = imageScale;
    console.log(image2);
    loadImage();
  }
}

// Navigates to the next slide in the list
function nextSlide() {
  if (!selectionDone) {
    // Figure out what the next slide is

    let nextSlideIndex;

    // If we are at the last slide the next one is the first (zero based)
    if (currentSlideIndex === slideArray.length - 1) {
      nextSlideIndex = 0;
    } else {
      // Otherwise the next slide is the current one plus 1
      nextSlideIndex = currentSlideIndex + 1;
    }

    // Setup the next slide and current slide for animations
    document.getElementById("sample" + nextSlideIndex).style.left = "100%";
    document.getElementById("sample" + currentSlideIndex).style.left = 0;

    // Add the appropriate animation class to the slide
    document
      .getElementById("sample" + nextSlideIndex)
      .setAttribute("class", "singleSlide slideInRight");
    document
      .getElementById("sample" + currentSlideIndex)
      .setAttribute("class", "singleSlide slideOutLeft");

    // Set current slide to the new current slide
    currentSlideIndex = nextSlideIndex;
    sampleSelect.value = slideArray[currentSlideIndex].title;
    sampleProperties = slideArray[currentSlideIndex];
    imageUrl = sampleProperties.url;
    imageScale = sampleProperties.scale;
    image2.src = imageScale;
    mapScale.src =
      sampleSelect.value == "Dam"
        ? "./images/damScale.png"
        : "./images/farmScale.png";
    loadImage();
  }
}

//Event listeners
canvas.addEventListener("click", function (event) {
  if (readyToPlot) {
    getCursorPosition(canvas, event);
  }
});

colorDiv.forEach(function (div, index) {
  div.addEventListener("click", function (event) {
    changeColor(event);
  });
});

ins.addEventListener("click", function () {
  showInstructions();
});

newPath.addEventListener("click", function () {
  showTypeTabble();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click

    if (savePolygon) {
      if (points.length != 0) {
        namingRegionPolygon();
      }
    } else if (saveLine) {
      if (lines.length != 0) {
        namingRegionLine();
      }
    } else if (saveTree) {
      if (trees.length != 0) {
        namingRegionTree();
      }
    }
  }
});

markedTrees.addEventListener("click", function () {
  showTableTree();
});
markedRegions.addEventListener("click", function () {
  showTableRegion();
});
markedBunds.addEventListener("click", function () {
  showTableLines();
});

window.addEventListener("afterprint", afterPrint);
window.addEventListener("beforeprint", beforePrint);

//Set sample from slider
function setSample() {
  if (sampleSelect.value) {
    sample = sampleSelect.value;
    selectionDone = true;
    document.getElementById("selectSample").style.visibility = "hidden";
    sampleSelect.classList.add("selected");
    document.getElementById("nextButton").style.visibility = "visible";
    image2.src = sampleProperties.scale;
  } else {
    sampleSelect.placeholder = "Please slide the sample to confirm";
  }
}

// Next button
function navNext() {
  for (temp = 0; temp <= 2; temp++) {
    document.getElementById("canvas" + temp).style.visibility = "hidden";
  }
  simsubscreennum += 1;
  document.getElementById("canvas" + simsubscreennum).style.visibility =
    "visible";
  document.getElementById("nextButton").style.visibility = "hidden";
  magic();
}

//to next screen
function magic() {
  if (simsubscreennum == 2) {
    document.getElementById("mySlider").style.visibility = "hidden";
    document.getElementById("sliderNav").style.visibility = "hidden";
    reg.innerHTML = `Region: ${slideArray[currentSlideIndex].title}`;
  }
}

//load image to canvas

function loadImage() {
  let image = new Image();
  image.src = imageUrl; // a 400 x 400 image
  image2.src = imageScale;
  image.onload = draw;
}

//canvas, image, polygons, lines, trees
function draw(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let scale = Math.min(
    canvas.width / e.target.width,
    canvas.height / e.target.height
  );
  let width = e.target.width * scale;
  let height = e.target.height * scale;

  let x = canvas.width / 2 - width / 2;
  let y = canvas.height / 2 - height / 2;
  if (!print) {
    console.log(print);
    ctx.drawImage(e.target, x + 50, y + 20, width - 100, height - 50);
  }
  console.log(width, height);
  ctx.drawImage(image2, x, y, width, height);
  loadAllPaths();
}

function loadAllPaths() {
  pathsArray.forEach(function (path) {
    if (path.visibility) {
      markPoints(path);
    }
  });
  linesArray.forEach(function (line) {
    if (line.visibility) {
      markAllLines(line);
    }
  });
  treesArray.forEach(function (tree) {
    if (tree.visibility) {
      markAllTrees(tree);
    }
  });
}

//To get cursor position and get xand y axis
function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (polygonSet) {
    savePolygon = true;
    if (!points.color) {
      points.color = color;
    }
    points.push({
      x: x,
      y: y,
      // clr: color,
    });
    markPoints(points);
  } else {
    if (treeLine) {
      saveTree = true;
      if (!trees.color) {
        trees.color = color;
      }
      if (currentPatternTree != undefined) {
        trees.push({
          x: x,
          y: y,
          // clr: color,
        });
        markTrees(trees);
      }
    } else {
      saveLine = true;
      if (!lines.color) {
        lines.color = color;
      }
      lines.push({
        x: x,
        y: y,
      });

      markLines(lines);
    }
  }
}

//Mark points, lines and trees

//Polygon
function markPoints(paths) {
  ctx.beginPath();
  ctx.strokeStyle = paths.color;
  ctx.fillStyle = paths.color;
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  paths.forEach(function (point, index) {
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.fill();
    ctx.save();
    ctx.restore();
  });
  ctx.closePath();
}

//Trees
function markTrees(trees) {
  // ctx.strokeStyle = "#000000";
  ctx.font = "20px verdana";
  ctx.fillStyle = trees.color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.fillText(
    treeSample[currentPatternTree],
    trees[trees.length - 1].x - 8,
    trees[trees.length - 1].y + 4
  );
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  // }
  ctx.save();
  ctx.restore();
}
function markAllTrees(trees) {
  // ctx.strokeStyle = "#000000";
  ctx.font = "20px verdana";
  ctx.fillStyle = trees.color;
  ctx.lineWidth = 2;
  trees.forEach(function (tree, index) {
    ctx.beginPath();
    ctx.fillText(trees.pattern, tree.x - 8, tree.y + 4);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  });
  ctx.save();
  ctx.restore();
}

///Lines
function markLines(lines) {
  ctx.beginPath();
  ctx.strokeStyle = lines.color;
  ctx.lineWidth = 2;
  let patternSet =
    currentPatternLine === 0
      ? []
      : currentPatternLine === 1
      ? [1, 1]
      : [10, 10];
  ctx.setLineDash(patternSet);
  if (lines.length > 1) {
    ctx.moveTo(lines[lines.length - 2].x, lines[lines.length - 2].y);
    ctx.lineTo(lines[lines.length - 1].x, lines[lines.length - 1].y);
  }
  ctx.save();
  ctx.restore();
  ctx.stroke();
  ctx.closePath();
}

function markAllLines(lines) {
  ctx.beginPath();
  ctx.strokeStyle = lines.color;
  ctx.lineWidth = 2;
  let patternSet =
    lines.pattern === 0 ? [] : lines.pattern === 1 ? [1, 1] : [10, 10];
  ctx.setLineDash(patternSet);
  ctx.moveTo(lines[0].x, lines[0].y);
  for (let i = 1; i <= lines.length - 1; i++) {
    ctx.lineTo(lines[i].x, lines[i].y);
  }
  ctx.stroke();
  ctx.closePath();
}

//to save all trees to main array
function createNewTreeObject() {
  ctx.closePath();
  ctx.save();
  if (trees.length != 0) {
    if (trees.name != undefined) treesArray.push(trees);
  }
  trees = [];
}

//to save all polygons to main array
function createNewPathObject() {
  ctx.closePath();
  ctx.save();
  if (points.length != 0) {
    if (points.region != undefined) pathsArray.push(points);
  }
  points = [];
}

//to save all lines to main array
function createNewLineObject() {
  ctx.closePath();
  ctx.save();
  if (lines.length != 0) {
    if (lines.bund != undefined) linesArray.push(lines);
  }
  lines = [];
}

//to save all trees

//To changes color
function changeColor(evt) {
  color = rgba2hex(evt.target.style.backgroundColor);
  selColor.style.backgroundColor = color;
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
}

function editColorSetting(ele) {
  color = rgba2hex(ele.style.backgroundColor);
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
}
//Close modal
function closeModal() {
  modal.style.visibility = "hidden";
}

//instruction html
function showInstructions() {
  modal.style.visibility = "visible";
  let feature = "";
  if (sampleSelect.value == "Dam") {
    feature = features[0];
  } else {
    feature = features[1];
  }
  let instructions = `
  <div class="instructions">
    <ol>
    <li>${feature}</li>
    <li>Use polygon, polyline, and point features to digitize the identified feature.</li>
    <li>Click on Create and select the type/color of the feature. Start drawing the polygon/polyline/point on the canvas, click on enter to finish the feature, and name the feature.</li>
    <li>Click on the Marked feature to edit the created feature. Users can delete the created feature, remove visibility, mark the feature to the legend of the final map and rename it appropriately.</li>
    <li>Press Enter ↵ to save</li>
    </ol>
    <div class="close" title="close" onclick="closeModal()">&#9587;</div>

    `;
  content.innerHTML = instructions;
}

//select type of graphics
//HTML CONTENT
function showTypeTabble() {
  modal.style.visibility = "visible";
  let regionPrompt = `<div>
      <table>
      <tr>
      <th>Features to be digitized</th>
        <th>Type</th>
        <th>Select</th>
      </tr>
      <tr>
      <td>Tree</td>
      <td>Point</td>
      <td class="pattern" id="pat1" onclick="displayPattern(this)"><span style='font-size:30px;'>&#8727;</span></td>
      </tr>
      <tr>
      <td>Bund</td>
      <td>Polyline </td>
      <td class="pattern" id="pat2" onclick="displayPattern(this)"><span style='font-size:30px;'>&#8722;</span></td>
      </tr>
      <tr>
      <td>${
        sampleSelect.value == "Dam"
          ? "Pier, Fallow land, cropland, Non Scouring bed, Dam, Abutment, Retainment wall and river"
          : "Cropland, Fallowland, House"
      }</td>
      <td>Polygon</td>
      <td class="pattern" id="pat3" onclick="displayPattern(this)"><span style='font-size:30px;'>&#9648;</span></td>
      </tr>
      </table>
      <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    </div>`;
  content.innerHTML = regionPrompt;
}

function displayPattern(element) {
  if (element.id != "pat3") {
    readyToPlot = true;
    polygonSet = false;
    let patternArray = element.id == "pat1" ? treeSample : linesSample;
    treeLine = element.id == "pat1" ? true : false;
    modal.style.visibility = "visible";
    let regionPrompt = `<div>
      <p>Choose pattern:</p>
      <div class="patClass">
      <div class="pa" onclick="patternToDisplay(0)">${patternArray[0]}</div>
      <div class="pa" onclick="patternToDisplay(1)">${patternArray[1]}</div>
      <div class="pa" onclick="patternToDisplay(2)">${patternArray[2]}</div>
      <div class="close" title="close" onclick="closeModal()">&#9587;</div>
      </div>
    </div>`;
    content.innerHTML = regionPrompt;
  } else if (element.id == "pat3") {
    readyToPlot = true;
    polygonSet = true;
    currentPatternTree = "";
    currentPatternLine = "";
    treeLine = null;
    closeModal();
  }
}

function patternToDisplay(pattern) {
  if (treeLine) {
    currentPatternTree = pattern;
  } else {
    currentPatternLine = pattern;
  }
  closeModal();
}

function checkResetAll() {
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
}

//To save Trees, polygon and line
//Trees
function namingRegionTree() {
  modal.style.visibility = "visible";
  let regionPrompt = `<div>
      <p>Name the point</p>
      <input type="text" id="tree" oninput="getNameTree(event)"/>
      <button id="saveTree" onclick="saveRegionTree()">Save
      </button>
      <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    </div>`;
  content.innerHTML = regionPrompt;
}

function getNameTree(event) {
  treeName = event.target.value;
}
function saveRegionTree() {
  if (treeName != "") {
    saveTree = false;
    trees.pattern = treeSample[currentPatternTree];
    trees.name = treeName;
    trees.visibility = true;
    trees.legend = true;
    createNewTreeObject();
    checkResetAll();
    typeWriter();
    closeModal();
  } else {
    document.getElementById("tree").placeholder = "Enter data here";
  }
}

function setTableTree() {
  if (treesArray.length > 0) {
    let row = "";
    treesArray.forEach(function (tree, index) {
      row += `
          <tr>
            <td>${index + 1}</td>
            <td>${tree.name}</td>
            <td style="background-color:${tree.color}" ></td>
            <td><button id="btn${
              index + 1
            }" onclick="editRowTree(this)">Edit</button></td>
            <td><button id="delete${
              index + 1
            }" onclick="deleteRowTree(this)">Delete</button></td>
            
            <td>${
              tree.visibility
                ? `<input type="checkbox" id="show${
                    index + 1
                  }" onchange="showRowTree(${index},this)" checked />`
                : `<input type="checkbox" id="show${
                    index + 1
                  }" onchange="showRowTree(${index},this)" />`
            }</td>
            <td>${
              tree.legend
                ? `<input type="checkbox" id="legend${
                    index + 1
                  }" onchange="showLegendTree(${index},this)" checked />`
                : `<input type="checkbox" id="legend${
                    index + 1
                  }" onchange="showLegendTree(${index},this)" />`
            }</td>
          </tr>
          `;
    });
    tableContentTree = `
    <h5>Digitized Points</h5>
    <table class="dataTable">
      <tr>
      <th>Sl.No</th>
      <th>Point Name</th>
      <th>Color</th>
      <th colspan=2>Modify</th>
      <th>Visibility</th>
      <th>Legend</th>
      </tr>
      ${row}

    </table>

        <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    `;
  } else {
    tableContentTree = `
      <div>
      No point is digitized...
      <div class="close" title="close" onclick="closeModal()">&#9587;</div> </div>`;
  }
}

function showTableTree() {
  modal.style.visibility = "visible";
  setTableTree();
  content.innerHTML = tableContentTree;
}

//Edit, delete polygon
function editRowTree(element) {
  let extractId = [...element.id];
  let slno = extractId[extractId.length - 1];
  idToEditTree = extractId[extractId.length - 1] - 1;
  dataToEditTree = treesArray[idToEditTree];
  let tree = `<input type="text" value=${dataToEditTree.name} onchange="editNameTree(this)"/>`;
  let color = `${colorPallete}
              `;
  tableContentTree = `
      <h5>Digitized Points</h5>
    <table>
     <tr>
    <th>Sl.No</th>
    <th>Point Name</th>
    <th>Color</th>
    <th>Update</th>
    </tr>
    <td>${slno}</td>
    <td>${tree}</td>
    <td>${color}</td>
    <td><button onclick="saveChangesTree()">Save</button></td>
    </table>
        <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    `;
  content.innerHTML = tableContentTree;
}

//edit polygon name
function editNameTree(ele) {
  treeName = ele.value;
}

//edit polgon color
function editColorTree(ele) {
  color = ele.value;
}
function showRowTree(index, ele) {
  treesArray[index].visibility = ele.checked;
  checkResetAll();
}
function showLegendTree(index, ele) {
  treesArray[index].legend = ele.checked;
  checkResetAll();
}

//delete row
function deleteRowTree(element) {
  let extractId = [...element.id];
  idToDeleteTree = extractId[extractId.length - 1] - 1;
  treesArray.splice(idToDeleteTree, 1);
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
  setTableTree();
  content.innerHTML = tableContentTree;
}

//save editings
function saveChangesTree() {
  treesArray[idToEditTree].name = treeName;
  treesArray[idToEditTree].color = color;
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
  setTableTree();
  content.innerHTML = tableContentTree;
}

//Polygon Save
function namingRegionPolygon() {
  modal.style.visibility = "visible";
  let regionPrompt = `<div>
      <p>Name the polygon</p>
      <input type="text" id="area" oninput="getNamePolygon(event)"/>
      <button id="saveArea" onclick="saveRegionPolygon()">Save
      </button>
      <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    </div>`;
  content.innerHTML = regionPrompt;
}
function getNamePolygon(event) {
  regionName = event.target.value;
}
function saveRegionPolygon() {
  if (regionName != "") {
    savePolygon = false;
    points.region = regionName;
    points.visibility = true;
    points.legend = true;
    createNewPathObject();
    checkResetAll();
    typeWriter();
    closeModal();
  } else {
    document.getElementById("area").placeholder = "Enter name here";
  }
}

//Line Save
function namingRegionLine() {
  modal.style.visibility = "visible";
  let regionPrompt = `<div>
      <p>Name the polyline</p>
      <input type="text" id="line" oninput="getNameLine(event)"/>
      <button id="saveLine" onclick="saveRegionLine()">Save
      </button>
      <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    </div>`;
  content.innerHTML = regionPrompt;
}
function getNameLine(event) {
  lineName = event.target.value;
}
function saveRegionLine() {
  if (lineName != "") {
    saveLine = false;
    lines.pattern = currentPatternLine;
    lines.bund = lineName;
    lines.visibility = true;
    lines.legend = true;
    createNewLineObject();
    checkResetAll();
    typeWriter();
    closeModal();
  } else {
    document.getElementById("line").placeholder = "Enter name here";
  }
}

//Table to show trees

//Table to show polygon marked
function setTableRegion() {
  if (pathsArray.length > 0) {
    let row = "";
    pathsArray.forEach(function (point, index) {
      row += `
          <tr>
            <td>${index + 1}</td>
            <td>${point.region}</td>
            <td style="background-color:${point.color}" ></td>
            <td><button id="btn${
              index + 1
            }" onclick="editRowRegion(this)">Edit</button></td>
            <td><button id="delete${
              index + 1
            }" onclick="deleteRowRegion(this)">Delete</button></td>
            
            <td>${
              point.visibility
                ? `<input type="checkbox" id="show${
                    index + 1
                  }" onchange="showRowRegion(${index},this)" checked/>`
                : `<input type="checkbox" id="show${
                    index + 1
                  }" onchange="showRowRegion(${index},this)"/>`
            }</td>
            <td>${
              point.legend
                ? `<input type="checkbox" id="polyLegend${
                    index + 1
                  }" onchange="showLegendRegion(${index},this)" checked/>`
                : `<input type="checkbox" id="polyLegend${
                    index + 1
                  }" onchange="showLegendRegion(${index},this)"/>`
            }</td>
          </tr>
          `;
    });
    tableContentRegion = `
    <h5>Digitized Polygon</h5>
    <table class="dataTable">
      <tr>
      <th>Sl.No</th>
      <th>Polygon Name</th>
      <th>Color</th>
      <th colspan=2>Modify</th>
      <th>Visibility</th>
      <th>Legend</th>
      </tr>
      ${row}

    </table>
        <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    `;
  } else {
    tableContentRegion = `
      <div>
      No polygon is digitized...
      <div class="close" title="close" onclick="closeModal()">&#9587;</div> </div>`;
  }
}

function showTableRegion() {
  modal.style.visibility = "visible";
  setTableRegion();
  content.innerHTML = tableContentRegion;
}

//Edit, delete polygon
function editRowRegion(element) {
  let extractId = [...element.id];
  let slno = extractId[extractId.length - 1];
  idToEditRegion = extractId[extractId.length - 1] - 1;
  dataToEditRegion = pathsArray[idToEditRegion];
  let region = `<input type="text" value=${dataToEditRegion.region} onchange="editNameRegion(this)"/>`;
  let color = `${colorPallete}
              `;
  tableContentRegion = `
    <h5>Digitized Polygon</h5>
    <table>
     <tr>
    <th>Sl.No</th>
    <th>Polygon Name</th>
    <th>Color</th>
    <th>Update</th>
    </tr>
    <td>${slno}</td>
    <td>${region}</td>
    <td>${color}</td>
    <td><button onclick="saveChangesRegion()">Save</button></td>
    </table>
        <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    `;
  content.innerHTML = tableContentRegion;
}

//edit polygon name
function editNameRegion(ele) {
  regionName = ele.value;
}

//edit polgon color
function editColorRegion(ele) {
  color = ele.value;
}
function showRowRegion(index, ele) {
  pathsArray[index].visibility = ele.checked;
  checkResetAll();
}
function showLegendRegion(index, ele) {
  pathsArray[index].legend = ele.checked;
  checkResetAll();
}

//delete row
function deleteRowRegion(element) {
  let extractId = [...element.id];
  idToDeleteRegion = extractId[extractId.length - 1] - 1;
  pathsArray.splice(idToDeleteRegion, 1);
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
  setTableRegion();
  content.innerHTML = tableContentRegion;
}

//save editings
function saveChangesRegion() {
  pathsArray[idToEditRegion].region = regionName;
  pathsArray[idToEditRegion].color = color;
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
  setTableRegion();
  content.innerHTML = tableContentRegion;
}

//Table to show lines marked
function setTableLines() {
  if (linesArray.length > 0) {
    let row = "";
    linesArray.forEach(function (line, index) {
      row += `
            <tr>
              <td>${index + 1}</td>
              <td>${line.bund}</td>
              <td style="background-color:${line.color}" ></td>
              <td><button id="btn${
                index + 1
              }" onclick="editRowLine(this)">Edit</button></td>
              <td><button id="delete${
                index + 1
              }" onclick="deleteRowLine(this)">Delete</button></td>
              <td>${
                line.visibility
                  ? `<input type="checkbox" id="show${
                      index + 1
                    }" onchange="showRowLine(${index},this)" checked />`
                  : `<input type="checkbox" id="show${
                      index + 1
                    }" onchange="showRowLine(${index},this)" />`
              }</td>
              <td>${
                line.legend
                  ? `<input type="checkbox" id="show${
                      index + 1
                    }" onchange="showLegendLine(${index},this)" checked />`
                  : `<input type="checkbox" id="show${
                      index + 1
                    }" onchange="showLegendLine(${index},this)" />`
              }</td>
            </tr>
            `;
    });
    tableContentLine = `
      <h5>Digitized Polyline</h5>
      <table class="dataTable">
        <tr>
        <th>Sl.No</th>
        <th>Polyline Name</th>
        <th>Color</th>
        <th colspan=2>Modify</th>
        <th>Visibility</th>
        <th>Legend</th>
        </tr>
        ${row}

      </table>
          <div class="close" title="close" onclick="closeModal()">&#9587;</div>
      `;
  } else {
    tableContentLine = `
        <div>
        No polyline is digitized...
        <div class="close" title="close" onclick="closeModal()">&#9587;</div> </div>`;
  }
}

function showRowLine(index, ele) {
  linesArray[index].visibility = ele.checked;
  checkResetAll();
}
function showLegendLine(index, ele) {
  linesArray[index].legend = ele.checked;
  checkResetAll();
}

function showTableLines() {
  modal.style.visibility = "visible";
  setTableLines();
  content.innerHTML = tableContentLine;
}

//Edit, delete polygon
function editRowLine(element) {
  let extractId = [...element.id];
  let slno = extractId[extractId.length - 1];
  idToEditLine = extractId[extractId.length - 1] - 1;
  dataToEditLine = linesArray[idToEditLine];
  let bund = `<input type="text" value="${dataToEditLine.bund}" onchange="editNameLine(this)"/>`;
  let color = `${colorPallete}
              `;
  tableContentLine = `
    <h5>Digitized Polyline</h5>
    <table>
     <tr>
    <th>Sl.No</th>
    <th>Polyline Name</th>
    <th>Color</th>
    <th>Update</th>
    </tr>
    <td>${slno}</td>
    <td>${bund}</td>
    <td>${color}</td>
    <td><button onclick="saveChangesLine()">Save</button></td>
    </table>
        <div class="close" title="close" onclick="closeModal()">&#9587;</div>
    `;
  content.innerHTML = tableContentLine;
}

//edit polygon name
function editNameLine(ele) {
  lineName = ele.value;
}

//edit polgon color
function editColorLine(ele) {
  color = ele.value;
}

//delete row
function deleteRowLine(element) {
  let extractId = [...element.id];
  idToDeleteLine = extractId[extractId.length - 1] - 1;
  linesArray.splice(idToDeleteLine, 1);
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
  setTableLines();
  content.innerHTML = tableContentLine;
}

//save editings
function saveChangesLine() {
  linesArray[idToEditLine].bund = lineName;
  linesArray[idToEditLine].color = color;
  createNewPathObject();
  createNewLineObject();
  createNewTreeObject();
  loadImage();
  setTableLines();
  content.innerHTML = tableContentLine;
}

//Typing effect
let i = 0;
let speed = 50;
let timer = 0;

function typeWriter() {
  document.getElementById("status").style.visibility = "visible";
  if (i < txt.length) {
    document.getElementById("status").innerHTML += txt.charAt(i);
    i++;
    timer = setTimeout(typeWriter, speed);
  } else {
    i = 0;
    clearTimeout(timer);
    document.getElementById("status").innerHTML = "";
  }
}

function generateTreeOverview() {
  treeOverview = ``;
  if (treesArray.length > 0) {
    treesArray.forEach(function (tree) {
      if (tree.legend) {
        treeOverview += `
      <tr>
      <td><span class="cc" style="color:${tree.color};">${tree.pattern}</span></td>
      <td><span class="bcc">${tree.name}</span></td>
      </tr>
      `;
      }
    });
  }
}
function generatelineOverview() {
  lineOverview = "";
  if (linesArray.length > 0) {
    linesArray.forEach(function (line) {
      if (line.legend) {
        let pattern = "";
        if (line.pattern === 0) {
          pattern = "solid";
        } else if (line.pattern === 1) {
          pattern = "dotted";
        } else {
          pattern = "dashed";
        }
        lineOverview += `
      <tr>
      <td><span class="bc" style="border-bottom-style:${pattern}; border-bottom-color: ${line.color}; border-bottom-width: 5px"></span></td>
      <td><span class="bcc">${line.bund}</span></td>
      </tr>
      `;
      }
    });
  }
}
function generatePolygonOverview() {
  pathOverview = "";
  if (pathsArray.length > 0) {
    pathsArray.forEach(function (path) {
      if (path.legend) {
        pathOverview += `
      <tr>
      <td><span class="bc" style="background-color:${path.color};"></span></td>
      <td><span class="bcc">${path.region}</span></td>
      </tr>
      `;
      }
    });
  }
}

function overview() {
  generateTreeOverview();
  generatelineOverview();
  generatePolygonOverview();
  modal.style.visibility = "visible";
  overviewContent = `
  <div id="overviewc">
    <p>Legend</p>
    <table>
      ${treeOverview}
      ${lineOverview}
      ${pathOverview}
      </table>
  </div>

<div class="close" title="close" onclick="closeModal()">&#9587;</div>
  `;

  content.innerHTML = overviewContent;
}

function updateOverview() {
  generateTreeOverview();
  generatelineOverview();
  generatePolygonOverview();
  overviewContent = `
  <div id="overviewc">
    <p>Legend</p>

       <table>
      ${treeOverview}
      ${lineOverview}
      ${pathOverview}
      </table>
  </div>
  `;

  content.innerHTML = overviewContent;
}

function beforePrint() {
  checkResetAll();
}

function afterPrint() {
  print = false;
  checkResetAll();
}

function printUpdate() {
  if (pathsArray.length > 0 || linesArray.length > 0 || treesArray.length > 0) {
    print = true;
    checkResetAll();
  }
  setTimeout(function () {
    if (
      pathsArray.length > 0 ||
      linesArray.length > 0 ||
      treesArray.length > 0
    ) {
      updateOverview();
      window.print();
    }
  }, 1000);
}

function showResultMap() {
  modal.style.visibility = "visible";
  let resultContent = "";
  if (sampleSelect.value == "Dam") {
    resultContent = "<img src='./images/dam_output.png' width='600'/>";
  } else {
    resultContent = "<img src='./images/farm_output.png' width='600'/>";
  }
  resultContent += `<div class="close" title="close" onclick="closeModal()">&#9587;</div>`;
  content.innerHTML = resultContent;
}

function toggleOverlayImage() {
  print = !print;
  checkResetAll();
}
