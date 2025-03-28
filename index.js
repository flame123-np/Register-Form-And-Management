const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE'; // default mode
let selectId = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    
    if (id) {
        mode = 'EDIT';
        selectId = id;

        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            const user = response.data;

            // นำข้อมูลที่ดึงมาแสดงใน input
            document.querySelector('input[name=firstname]').value = user.firstname;
            document.querySelector('input[name=lastname]').value = user.lastname;
            document.querySelector('input[name=age]').value = user.age;
            document.querySelector('textarea[name=description]').value = user.description;
            
            let genderDom = document.querySelectorAll('input[name=gender]');
            let interestDoms = document.querySelectorAll('input[name=interest]');

            for (let i = 0; i < genderDom.length; i++) {
                if (genderDom[i].value == user.gender) {
                    genderDom[i].checked = true;
                }
            }

            for (let i = 0; i < interestDoms.length; i++) {
                if (user.interests.includes(interestDoms[i].value)) {
                    interestDoms[i].checked = true;
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

// ฟังก์ชันตรวจสอบข้อมูลก่อนส่ง
const validateData = (userData) => {
   let errors = [];
   if (!userData.firstname) errors.push('กรุณากรอกชื่อ');
   if (!userData.lastname) errors.push('กรุณากรอกนามสกุล');
   if (!userData.age) errors.push('กรุณากรอกอายุ');
   if (!userData.gender) errors.push('กรุณาเลือกเพศ');
   if (!userData.interests.length) errors.push('กรุณาเลือกความสนใจ');
   if (!userData.description) errors.push('กรุณากรอกข้อมูล');
   return errors;
}

// ฟังก์ชันส่งข้อมูล
const submitData = async () => {
    let firstNameDom = document.querySelector('input[name=firstname]');
    let lastNameDom = document.querySelector('input[name=lastname]');
    let ageDom = document.querySelector('input[name=age]');
    let genderDom = document.querySelector('input[name=gender]:checked');
    let interestDoms = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDom = document.querySelector('textarea[name=description]');
    let messageDOM = document.getElementById('message');

    let interests = [];
    interestDoms.forEach(dom => interests.push(dom.value));

    let userData = {
        firstname: firstNameDom.value,
        lastname: lastNameDom.value,
        age: ageDom.value,
        gender: genderDom ? genderDom.value : '',
        description: descriptionDom.value,
        interests: interests
    }

    console.log('submitData', userData);

    // ตรวจสอบข้อมูลก่อนส่ง
    const errors = validateData(userData);
    if (errors.length > 0) {
        messageDOM.innerHTML = `<div>กรุณากรอกข้อมูลให้ครบถ้วน</div><ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
        messageDOM.className = 'message danger';
        return;
    }

    try {
        let message = 'บันทึกข้อมูลเรียบร้อย';
        let response;

        if (mode === 'CREATE') {
            response = await axios.post(`${BASE_URL}/users`, userData);
        } else {
            response = await axios.put(`${BASE_URL}/users/${selectId}`, userData);
            message = 'แก้ไขข้อมูลเรียบร้อย';
        }

        console.log('response', response.data);
        messageDOM.innerText = message;
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message', error.message);
        messageDOM.innerHTML = `<div>เกิดข้อผิดพลาด: ${error.message}</div>`;
        messageDOM.className = 'message danger';
    }
}

// เพิ่ม Event Listener ให้ปุ่มกด
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', submitData);
});
