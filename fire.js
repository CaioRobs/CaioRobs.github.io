const pixelsArray = []
const fireWidth = 191
const fireHeight = 9
const fireColorsPalette = [{
	"r": 0,
	"g": 159,
	"b": 104
}, {
	"r": 49,
	"g": 93,
	"b": 14
}, {
	"r": 65,
	"g": 124,
	"b": 18
}, {
	"r": 82,
	"g": 155,
	"b": 23
}, {
	"r": 98,
	"g": 186,
	"b": 28
}, {
	"r": 115,
	"g": 217,
	"b": 32
}, {
	"r": 133,
	"g": 225,
	"b": 60
}, {
	"r": 153,
	"g": 230,
	"b": 91
}, {
	"r": 172,
	"g": 234,
	"b": 122
}, {
	"r": 191,
	"g": 239,
	"b": 253
}, ]
const debug = false

function start() {
	createFireDataStructure()
	createFireSource()
	renderFire()

	setInterval(calculateFirePropagation, 85)
}

function createFireDataStructure() {
	const numberOfPixels = fireWidth * fireHeight
	for (let i = 0; i < numberOfPixels; i++) {
		pixelsArray[i] = 0
	}
}

function calculateFirePropagation() {
	for (let column = 0; column < fireWidth; column++) {
		for (let row = 0; row < fireHeight; row++) {
			const pixelIndex = column + (fireWidth * row)
			updateFireIntensityPerPixel(pixelIndex)
		}
	}
	renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
	const decay = Math.floor(Math.random() * 3)
	const belowPixelIndex = currentPixelIndex + fireWidth
	const belowPixelIntensity = pixelsArray[belowPixelIndex]
	const currentPixelIntensity =
		belowPixelIntensity - decay >= 0 ? belowPixelIntensity - decay : 0

	if (belowPixelIndex >= fireWidth * fireHeight) {
		return
	}

	pixelsArray[currentPixelIndex - decay] = currentPixelIntensity
}

function renderFire() {
	let html = '<table class="fire-table" cellpadding=0 cellspacing=0>'

	for (let row = 0; row < fireHeight; row++) {
		html += '<tr>'

		for (let column = 0; column < fireWidth; column++) {
			const pixelIndex = column + (fireWidth * row)
			const fireIntensity = pixelsArray[pixelIndex]

			if (debug === true) {
				html += '<td>'
				html += `<div class="pixel-index">${pixelIndex}</div>`
				html += fireIntensity
				html += '</td>'
			} else {
				const color = fireColorsPalette[fireIntensity]
				const colorString = `${color.r} ,${color.g} ,${color.b}`
				html += `<td class="pixel" style="background-color: rgb(${colorString})">`
				html += `<div class="pixel-index"></div>`
				html += '</td>'
			}
		}

		html += '</tr>'
	}

	html += '</table>'

	document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
	for (let column = 0; column <= fireWidth; column++) {
		const overflowPixelIndex = fireWidth * fireHeight
		const pixelIndex = (overflowPixelIndex - fireWidth) + column;

		pixelsArray[pixelIndex] = 9

	}

}

start()
