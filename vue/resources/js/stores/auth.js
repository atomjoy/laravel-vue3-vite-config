import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import router from '../router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
	// State
	const user = ref(null)
	const loggedIn = ref(false)
	const error = ref(false)
	const message = ref(null)

	// Getters
	const isLoggedIn = computed(() => loggedIn)
	const getMessage = computed(() => message)
	const getError = computed(() => error)
	const getUser = computed(() => user)

	// Actions
	async function changeLocale(locale) {
		try {
			let res = await axios.get('/web/api/locale/' + locale)
			devlog('Change server locale', res?.data)
		} catch (err) {
			devlog('Change server locale', err?.response?.data?.message ?? err?.message ?? 'Ups! Invalid data')
		}
	}

	async function isAuthenticated() {
		try {
			let res = await axios.get('/web/api/logged')
			devlog('isAuthenticated OK')
			user.value = res?.data?.user
			loggedIn.value = true
		} catch (err) {
			devlog('isAuthenticated ERR')
			user.value = null
			loggedIn.value = false
		}
	}

	async function registerUser(data) {
		try {
			let res = await axios.post('/web/api/register', data)
			devlog('Register OK')
			message.value = res?.data?.message
			error.value = false
		} catch (err) {
			message.value = err?.response?.data?.message ?? err?.message ?? 'Ups! Invalid data'
			error.value = true
			devlog('Register ERR', message.value)
		}
	}

	async function activateUser(id, code) {
		try {
			let res = await axios.get('/web/api/activate/' + id + '/' + code)
			devlog('Activate OK')
			message.value = res?.data?.message
			error.value = false
		} catch (err) {
			message.value = err?.response?.data?.message ?? err?.message ?? 'Ups! Invalid data'
			error.value = true
			devlog('Activate ERR', message.value)
		}
	}

	async function loginUser(data) {
		try {
			let res = await axios.post('/web/api/login', data)
			devlog('Login OK')
			setAuth(res)
			router.push('/panel')
		} catch (err) {
			devlog('Login ERR')
			delAuth(err)
		}
	}

	async function logoutUser() {
		try {
			let res = await axios.get('/web/api/logout')
			devlog('Logout OK')
			message.value = ''
			loggedIn.value = false
			user.value = null
		} catch (err) {
			devlog('Logout ERR')
		}
	}

	async function changeUserPassword(data) {
		try {
			let res = await axios.post('/web/api/change-password', data)
			devlog('Password OK')
			message.value = res?.data?.message
			error.value = false
		} catch (err) {
			devlog('Password ERR')
			message.value = err?.response?.data?.message ?? err?.message ?? 'Ups! Invalid data'
			error.value = true
		}
	}

	async function resetUserPassword(data) {
		try {
			let res = await axios.post('/web/api/reset', data)
			devlog('Password OK')
			message.value = res?.data?.message
			error.value = false
		} catch (err) {
			console.log('Password ERR')
			message.value = err?.response?.data?.message ?? err?.message ?? 'Ups! Invalid data'
			error.value = true
		}
	}

	function devlog(str, data = null) {
		const applog = import.meta.env.VITE_APP_LOG ?? null
		if (applog === 'true') {
			console.log(str, data)
		}
	}

	function setAuth(res) {
		loggedIn.value = true
		user.value = res?.data?.user ?? null
		message.value = res?.data?.message ?? 'Authenticated.'
		error.value = false
	}

	function delAuth(err) {
		loggedIn.value = false
		user.value = null
		message.value = err?.response?.data?.message ?? err?.message ?? 'Unauthenticated.'
		error.value = true
	}

	function clearError() {
		message.value = null
		error.value = false
	}

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return {
		changeLocale,
		isAuthenticated,
		registerUser,
		activateUser,
		loginUser,
		logoutUser,
		changeUserPassword,
		resetUserPassword,
		clearError,
		scrollTop,
		isLoggedIn,
		getMessage,
		getError,
		getUser,
	}
})
