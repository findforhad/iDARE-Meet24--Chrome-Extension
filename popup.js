function addElement(parentId, elementTag, elementId, html) {
  let p = document.getElementById(parentId);
  let newElement = document.createElement(elementTag);
  newElement.setAttribute("id", elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
}
function removeElement(elementId) {
  let element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

function fallbackToClipboard(text) {
  let textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

async function callToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackToClipboard(text);
    return;
  }
  await navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

let meet_colleague = document.getElementById("meet_colleague");
meet_colleague.addEventListener("click", function (e) {
  callToClipboard(document.getElementById("meet_colleague_link").textContent);
  if (document.getElementById("message_box")) {
    removeElement("message_box");
  }
  addElement(
    "plugin_parant",
    "div",
    "message_box",
    `<div class="mt-2 text-center">
        <div class="ui violet small message" id="message_box">
          <i class="copy outline icon"></i> Successfully copied meeting link to your clipboard
        </div>
      </div>`
  );

  setTimeout(() => {
    removeElement("message_box");
    window.open(document.getElementById("meet_colleague_link").textContent);
  }, 3000);
});

let instant_meeting = document.getElementById("instant_meeting");
instant_meeting.addEventListener("click", (e) => {
  callToClipboard(document.getElementById("instant_meeting_link").textContent);
  if (document.getElementById("message_box")) {
    removeElement("message_box");
  }
  addElement(
    "plugin_parant",
    "div",
    "message_box",
    `<div class="mt-2 text-center">
        <div class="ui violet small message" id="message_box">
          <i class="copy outline icon"></i> Successfully copied meeting link to your clipboard
        </div>
      </div>`
  );

  setTimeout(() => {
    removeElement("message_box");
    window.open(document.getElementById("instant_meeting_link").textContent);
  }, 3000);
});

let standup_meeting = document.getElementById("standup_meeting");
standup_meeting.addEventListener("click", (e) => {
  window.open(document.getElementById("standup_meeting_link").textContent);
});

let review_meeting = document.getElementById("review_meeting");
review_meeting.addEventListener("click", (e) => {
  window.open(document.getElementById("review_meeting_link").textContent);
});

let us_meeting = document.getElementById("us_meeting");
us_meeting.addEventListener("click", (e) => {
  console.log(document.getElementById("us_meeting_link").textContent);
  window.open(document.getElementById("us_meeting_link").textContent);
});

let dv24 = document.getElementById("dv24");
dv24.addEventListener("click", (e) => {
  alert("Currently Dream Vision24® is in Dream");
});
