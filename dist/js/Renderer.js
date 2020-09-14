export class Renderer {
    getCityElement(city) {
        if (city._id) {
            const imgHtml = `<img src="${city.conditionPic}">`

            const element =
                `<li lass="list-group-item list-group-item-dark" data-id=${city.id}>
                    ${imgHtml}
                    <span>
                        ${city.name.split(',')[0]}, ${city.temperature}C, ${city.condition}
                    </span>
                    <button type="button" class="btn btn-light remove-btn">&#8722;</button>
                </li>`;

            return element;

        } else {
            const imgHtml = `<img src="${city.conditionPic}">`

            const element =
                `<li lass="list-group-item list-group-item-dark" data-id=${city.searchQuery}>
                    ${imgHtml}
                    <span>
                        ${city.name} ${city.temp}C, ${condition}
                    </span>
                    <button type="button" class="btn btn-light add-btn">&#43;</button>
                </li>`;

            return element;
        }

    }

    renderData(cities) {
        console.log(cities);
        $('.list-group').empty();

        cities.forEach((c) => {
            const cityHtml = this.getCityElement(c)

            $('.list-group').append(cityHtml);
        })
    }
}