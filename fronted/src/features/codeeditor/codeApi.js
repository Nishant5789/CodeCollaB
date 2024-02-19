import axios from "axios";


export function ExecuteCode(CodeData) {
    return axios.post(`http://localhost:8080/codeRunner/executeCode`,CodeData);
}

export function fetchCodeStatus(jobId) {
    return axios.get(`http://localhost:8080/codeRunner/status?jobId=${jobId}`);
}

export function fetchCodeStatement(problemId) {
    return axios.get(`http://localhost:8080/codeRunner/problem/${problemId}`);
}
