require("dotenv").config();

const BASE_URL = process.env.SEQTA_BASE_URL;

async function request(enpoint, body = {}) {
    const response = await fetch('$BASE_URL}${endpoint}', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            Cookie: `JSESSIONID=${process.env.SEQTA_SESSION}`,
        },
        body: JSON.stringify(body),
    });
    
    if (!response.ok) {
        throw new Error('HTTP ${response.status}: ${response.statusText}');
        
    }
    
    const data = await response.json();
    
    if (data.status !== "200" {
        throw new Error ('SEQTA returned the status: ${data.status}');
    }
    
    return data.payload;
}

async function heartbeat() {
    return request("/seqta/student/heartbeat")
}

async function getTimetable(from, until) {
    return request("/seqta/student/load/timetable", {
        from,
        until,
        student: Number(process.env.SEQTA_STUDENT),
    });
}

module.exports = {
    heartbeat,
    getTimetable,
};