export const endpoints: object = {
    auth: {
        login: {
            url: '/auth/login',
            method: 'post'
        },
        register: {
            url: '/auth/register',
            method: 'post'
        },
        token: {
            url: '/auth/token',
            method: 'get'
        },
        password: {
            reset: {
                url: '/auth/password/reset',
                method: 'put'
            },
            check: {
                url: '/auth/token/check',
                method: 'get'
            },
            forgot: {
                url: '/auth/password/forgot',
                method: 'post'
            }
        },
        social: {
            login: {
                url: '/auth/social/login',
                method: 'post'
            }
        }
    },
    profile: {
        photo: {
            change: {
                url: '/profile/photo/change',
                method: 'put'
            },
            remove: {
                url: '/profile/photo/remove',
                method: 'put'
            }
        },
        update: {
            url: '/profile/update',
            method: 'put'
        },
        password: {
            change: {
                url: '/profile/password/change',
                method: 'put'
            }
        }
    },
    admin: {
        users: {
            list: {
                url: '/admin/users',
                method: 'get'
            },
            show: {
                url: '/admin/users/{id}',
                method: 'get'
            },
            create: {
                url: '/admin/users',
                method: 'post'
            },
            update: {
                url: '/admin/users/{id}',
                method: 'put'
            },
            status: {
                url: '/admin/users/{id}/{status}',
                method: 'patch'
            },
            delete: {
                url: '/admin/users/{id}',
                method: 'delete'
            },
            photo: {
                change: {
                    url: '/admin/users/{id}/photo/change',
                    method: 'post'
                },
                remove: {
                    url: '/admin/users/{id}/photo/remove',
                    method: 'put'
                }
            },
            password: {
                change: {
                    url: '/admin/users/{id}/password/change',
                    method: 'put'
                },
                reset: {
                    url: '/admin/users/{id}/password/reset',
                    method: 'put'
                }
            }
        },
        roles: {
            url: '/admin/roles',
            method: 'get'
        },
        security: {
            login_attempts: {
                get: {
                    url: '/admin/security/login_attempts',
                    method: 'get'
                },
                reset: {
                    url: '/admin/security/login_attempts/{id}/reset',
                    method: 'put'
                }
            },
            error_logs: {
                get: {
                    url: '/admin/security/error_logs',
                    method: 'get'
                },
                reset: {
                    url: '/admin/security/error_logs/reset',
                    method: 'put'
                }
            }
        }
    }
};
