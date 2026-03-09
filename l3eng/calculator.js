let standards = [
    {
        id: 91472,
        internal: false,
        credits: 4,
        reference: 1,
        title: "Respond critically to specified aspect(s) of studied written text(s), supported by evidence",
        nick: "Written Text Essay"
    },
    {
        id: 91473,
        internal: false,
        credits: 4,
        reference: 2,
        title: "Respond critically to specified aspect(s) of studied visual or oral text(s), supported by evidence",
        nick: "Visual Text Essay"
    },
    {
        id: 91474,
        internal: false,
        credits: 4,
        reference: 3,
        title: "Respond critically to significant aspects of unfamiliar written texts through close reading, supported by evidence",
        nick: "Unfamiliar Text Analysis"
    },
    {
        id: 91475,
        internal: true,
        credits: 6,
        reference: 4,
        title: "Produce a selection of fluent and coherent writing which develops, sustains, and structures ideas",
        nick: "Writing Portfolio"
    },
    {
        id: 91476,
        internal: true,
        credits: 3,
        reference: 5,
        title: "	Create and deliver a fluent and coherent oral text which develops, sustains, and structures ideas",
        nick: "Oral Presentation"
    },
    {
        id: 91477,
        internal: true,
        credits: 3,
        reference: 6,
        title: "	Create a fluent and coherent visual text which develops, sustains, and structures ideas using verbal and visual features",
        nick: "Visual Presentation"
    },
    {
        id: 91478,
        internal: true,
        credits: 4,
        reference: 7,
        title: "Respond critically to significant connections across texts, supported by evidence",
        nick: "Making Connections"
    },
    {
        id: 91479,
        internal: true,
        credits: 4,
        reference: 8,
        title: "Develop an informed understanding of literature and/or language using critical texts",
        nick: "Use Critical Texts in Research"
    },
    {
        id: 91480,
        internal: true,
        credits: 3,
        reference: 9,
        title: "Respond critically to significant aspects of visual and/or oral text(s) through close reading, supported by evidence",
        nick: "Close Viewing"
    }
];

let standardTotal = 0;
let resultTable;

function updateTotal() {
    resultTable.children[0].children[0].children[1].textContent = standardTotal;
}

function addStandard(standard, parentElement) {
    // const standard = standards[index];
    let checkbox = document.createElement("input");
    let label = document.createElement("label");

    checkbox.addEventListener("click", function() {
        if (checkbox.checked) standardTotal += standard.credits;
        else standardTotal -= standard.credits;
        updateTotal();
    }, {passive: true});

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", standard.id)
    checkbox.setAttribute("name", standard.id)
    label.setAttribute("for", standard.id)
    label.textContent = "3." + standard.reference + ": " + standard.nick + " (" + standard.credits + " credits)";
    label.title = standard.title;

    parentElement.appendChild(checkbox);
    parentElement.appendChild(label);
}

let standardsField = document.getElementById("standards-field");
for (let i=0; i < standards.length - 1; ++i) {
    addStandard(standards[i], standardsField);
    standardsField.appendChild(document.createElement("br"));
}
addStandard(standards[standards.length-1], standardsField);

resultTable = document.getElementById("result-table");