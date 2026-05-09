/** @odoo-module **/

(function () {
    'use strict';

    function rpc(url, params) {
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'call',
                id: Date.now(),
                params: params || {},
            }),
        })
        .then(function (r) { return r.json(); })
        .then(function (data) {
            if (data.error) {
                console.error('Notification bell RPC error:', data.error);
                return null;
            }
            return data.result;
        });
    }

    function escapeHtml(str) {
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function timeAgo(dateStr) {
        var diff = (Date.now() - new Date(dateStr + ' UTC').getTime()) / 1000;
        if (diff < 60) return 'just now';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return Math.floor(diff / 86400) + 'd ago';
    }

    function typeBadgeClass(type) {
        switch (type) {
            case 'invite': return 'text-bg-info';
            case 'status_change': return 'text-bg-warning';
            case 'assignment': return 'text-bg-primary';
            case 'mention': return 'text-bg-success';
            default: return 'text-bg-secondary';
        }
    }

    function renderItem(n) {
        var card = document.createElement('div');
        card.className = 'itlingo-bell-item';
        card.dataset.id = n.id;

        var header = '<div class="d-flex justify-content-between align-items-start">'
            + '<span class="badge rounded-pill ' + typeBadgeClass(n.notification_type) + ' me-1">'
            + escapeHtml(n.notification_type) + '</span>'
            + '<small class="text-muted text-nowrap">' + timeAgo(n.create_date) + '</small>'
            + '</div>';

        var title = '<div class="itlingo-bell-item__title mt-1">'
            + escapeHtml(n.title) + '</div>';

        var actions = '';
        if (n.is_actionable) {
            actions = '<div class="itlingo-bell-item__actions mt-2">'
                + '<button class="btn btn-sm btn-success me-1 itlingo-bell-action" data-action="accept" data-notif="' + n.id + '">'
                + '<i class="fa fa-check me-1"></i>Accept</button>'
                + '<button class="btn btn-sm btn-danger itlingo-bell-action" data-action="reject" data-notif="' + n.id + '">'
                + '<i class="fa fa-times me-1"></i>Decline</button>'
                + '</div>';
        } else {
            actions = '<div class="itlingo-bell-item__actions mt-2">'
                + '<button class="btn btn-sm btn-outline-secondary itlingo-bell-dismiss" data-notif="' + n.id + '">'
                + '<i class="fa fa-eye me-1"></i>Dismiss</button>'
                + '</div>';
        }

        card.innerHTML = header + title + actions;
        return card;
    }

    var allInstances = [];

    function updateAllBadges(count) {
        allInstances.forEach(function (inst) {
            inst.setBadge(count);
        });
    }

    function closeAllDropdowns() {
        allInstances.forEach(function (inst) {
            inst.close();
        });
    }

    function initBell(wrapper) {
        var bell = wrapper.querySelector('.itlingo-bell');
        var badge = wrapper.querySelector('.itlingo-bell__badge');
        var dropdown = wrapper.querySelector('.itlingo-bell-dropdown');
        var list = wrapper.querySelector('.itlingo-bell-dropdown__list');
        var empty = wrapper.querySelector('.itlingo-bell-dropdown__empty');
        var clearBtn = wrapper.querySelector('.itlingo-bell__clear-all');

        if (!bell || !dropdown) return null;

        var isOpen = false;
        var loading = false;

        var inst = {
            setBadge: function (count) {
                if (count > 0) {
                    badge.textContent = count > 99 ? '99+' : count;
                    badge.classList.remove('d-none');
                } else {
                    badge.classList.add('d-none');
                }
            },
            close: function () {
                isOpen = false;
                dropdown.classList.add('d-none');
            },
        };

        function renderList(notifications) {
            list.innerHTML = '';
            if (!notifications || notifications.length === 0) {
                empty.classList.remove('d-none');
                list.classList.add('d-none');
                clearBtn.classList.add('d-none');
            } else {
                empty.classList.add('d-none');
                list.classList.remove('d-none');
                clearBtn.classList.remove('d-none');
                notifications.forEach(function (n) {
                    list.appendChild(renderItem(n));
                });
            }
        }

        function fetchBell() {
            if (loading) return;
            loading = true;
            rpc('/itlingo/notifications/bell').then(function (res) {
                loading = false;
                if (!res) return;
                updateAllBadges(res.unread_count);
                renderList(res.notifications);
            }).catch(function () { loading = false; });
        }

        function openDropdown() {
            closeAllDropdowns();
            isOpen = true;
            dropdown.classList.remove('d-none');
            fetchBell();
        }

        bell.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (isOpen) {
                inst.close();
            } else {
                openDropdown();
            }
        });

        function handleAction(e) {
            var actionBtn = e.target.closest('.itlingo-bell-action');
            if (actionBtn) {
                e.preventDefault();
                e.stopPropagation();
                var notifId = parseInt(actionBtn.dataset.notif, 10);
                var action = actionBtn.dataset.action;
                actionBtn.disabled = true;
                var sibling = actionBtn.parentElement.querySelector('.itlingo-bell-action:not([disabled])');
                if (sibling) sibling.disabled = true;
                rpc('/itlingo/notifications/invitation/respond', {
                    notification_id: notifId,
                    action: action,
                }).then(function (res) {
                    if (res) {
                        updateAllBadges(res.unread_count);
                        var card = actionBtn.closest('.itlingo-bell-item');
                        if (card) card.remove();
                        if (list.children.length === 0) {
                            renderList([]);
                        }
                    }
                });
                return;
            }

            var dismissBtn = e.target.closest('.itlingo-bell-dismiss');
            if (dismissBtn) {
                e.preventDefault();
                e.stopPropagation();
                var nid = parseInt(dismissBtn.dataset.notif, 10);
                dismissBtn.disabled = true;
                rpc('/itlingo/notifications/mark_read', {
                    notification_id: nid,
                }).then(function (res) {
                    if (res) {
                        updateAllBadges(res.unread_count);
                        var card = dismissBtn.closest('.itlingo-bell-item');
                        if (card) card.remove();
                        if (list.children.length === 0) {
                            renderList([]);
                        }
                    }
                });
                return;
            }

            var clearAll = e.target.closest('.itlingo-bell__clear-all');
            if (clearAll) {
                e.preventDefault();
                e.stopPropagation();
                rpc('/itlingo/notifications/mark_read', {}).then(function (res) {
                    if (res) {
                        updateAllBadges(0);
                        renderList([]);
                    }
                });
                return;
            }
        }

        dropdown.addEventListener('click', function (e) {
            handleAction(e);
            e.stopPropagation();
        });

        return inst;
    }

    function init() {
        var wrappers = document.querySelectorAll('.itlingo-bell-wrapper');
        if (!wrappers.length) return;

        wrappers.forEach(function (wrapper) {
            var inst = initBell(wrapper);
            if (inst) allInstances.push(inst);
        });

        document.addEventListener('click', function () {
            closeAllDropdowns();
        });

        if (allInstances.length > 0) {
            rpc('/itlingo/notifications/bell').then(function (res) {
                if (res) {
                    updateAllBadges(res.unread_count);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
