// react angular or vue comes in here
// this is vanilla javascript

// selectors
const amazonForm = document.getElementById("amazon-form");
const amazonId = document.getElementById("amazon-id");
const amazonAddress = document.getElementById("amazon-address");

// SEND POST TO API TO ADD AMAZON
// functions
async function addAmazon(e) {
  e.preventDefault();

  if (amazonId.value === "" || amazonAddress.value === "") {
    alert("Please fill in fields");
  }

  // get data to send to API
  const sendBody = {
    amazonId: amazonId.value,
    address: amazonAddress.value,
  };

  try {
    const res = await fetch("/api/v1/amazons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Amazon already exists!");
    }

    alert("Amazon added!");
    window.location.href = "/index.html";
  } catch (error) {
    alert(error);
    return;
  }
}

//event listeners
amazonForm.addEventListener("submit", addAmazon);
