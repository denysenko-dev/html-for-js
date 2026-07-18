function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function setHTML(selector, html) {
    const el = document.querySelector(selector);
    if (el) {
        el.innerHTML = html;
    }
}

function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) {
        el.textContent = text;
    }
}

setHTML('#my-name', `${escapeHtml(data.first_name)} <span class="color-gray">${escapeHtml(data.last_name)}</span>`);
setText('#job-title', data.job_title);
setText('.profile-data', data.profile);

/**
 * experience
 */

const experienceData = experience.map(item => `
    <section class="mb-5">
        <h4 class="company-name mb-2">${escapeHtml(item.company)} - ${escapeHtml(item.city)}, <i>${escapeHtml(item.from)} - ${escapeHtml(item.to)}</i></h4>
        <h5>${escapeHtml(item.position)}</h5>
        <p>${escapeHtml(item.description)}</p>
    </section>
`).join('');
setHTML('.experience-list', experienceData);

/**
 * contact data
 */

const contactsData = [
    `<li><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></li>`,
    `<li><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></li>`,
    `<li><a href="skype:${escapeHtml(data.skype)}">${escapeHtml(data.skype)}</a></li>`,
    `<li><a href="${escapeHtml(data.linkedin)}">${escapeHtml(data.linkedin)}</a></li>`
].join('');
setHTML('.contacts-block', contactsData);
setHTML('.address', `<p>${escapeHtml(data.address)}</p>`);

const photo = document.querySelector('#my-photo');
if (photo) {
    photo.src = data.photo;
}

/**
 * skills
 */

setHTML('.skills-list', data.skills.map(item => `<li>${escapeHtml(item)}</li>`).join(''));

/**
 * education
 */

setHTML('.education-list', data.education.map(item => `<li>${escapeHtml(item[0])}, ${escapeHtml(item[1])}</li>`).join(''));

/**
 * achievements
 */

setHTML('.achievements-list', data.achievements.map(item => `<li>${escapeHtml(item)}</li>`).join(''));
