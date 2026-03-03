<script lang="ts">
	import { OpenApiViewer, type OpenAPI } from 'ukiyoe/openapi';

	const spec: OpenAPI.Document = {
		openapi: '3.1.0',
		info: {
			title: 'Kiwi Trading API',
			version: '1.2.0',
			description: 'REST API for the Kiwi trading platform. Manage users, portfolios, orders, and market data.'
		},
		servers: [
			{ url: 'https://api.kiwi.trading/v1', description: 'Production' },
			{ url: 'https://sandbox.kiwi.trading/v1', description: 'Sandbox' }
		],
		paths: {
			'/users': {
				get: {
					tags: ['Users'],
					operationId: 'listUsers',
					summary: 'List all users',
					description: 'Returns a paginated list of users. Supports filtering by role and status.',
					parameters: [
						{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Page number' },
						{ name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 }, description: 'Items per page' },
						{ name: 'role', in: 'query', schema: { type: 'string', enum: ['admin', 'trader', 'viewer'] }, description: 'Filter by role' }
					],
					responses: {
						'200': {
							description: 'Paginated user list',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											data: {
												type: 'array',
												items: { $ref: '#/components/schemas/User' }
											},
											meta: { $ref: '#/components/schemas/PaginationMeta' }
										}
									}
								}
							}
						}
					}
				},
				post: {
					tags: ['Users'],
					operationId: 'createUser',
					summary: 'Create a user',
					description: 'Create a new user account. Requires admin privileges.',
					requestBody: {
						required: true,
						content: {
							'application/json': {
								schema: {
									type: 'object',
									required: ['name', 'email', 'role'],
									properties: {
										name: { type: 'string', example: 'Alice Chen' },
										email: { type: 'string', format: 'email', example: 'alice@kiwi.trading' },
										role: { type: 'string', enum: ['admin', 'trader', 'viewer'] }
									}
								}
							}
						}
					},
					responses: {
						'201': {
							description: 'User created',
							content: {
								'application/json': {
									schema: { $ref: '#/components/schemas/User' }
								}
							}
						},
						'400': { description: 'Validation error' },
						'409': { description: 'Email already in use' }
					}
				}
			},
			'/users/{userId}': {
				get: {
					tags: ['Users'],
					operationId: 'getUser',
					summary: 'Get user by ID',
					parameters: [
						{ name: 'userId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' }, description: 'User ID' }
					],
					responses: {
						'200': {
							description: 'User details',
							content: {
								'application/json': {
									schema: { $ref: '#/components/schemas/User' }
								}
							}
						},
						'404': { description: 'User not found' }
					}
				},
				delete: {
					tags: ['Users'],
					operationId: 'deleteUser',
					summary: 'Delete a user',
					description: 'Permanently delete a user account. This action is irreversible.',
					parameters: [
						{ name: 'userId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' }, description: 'User ID' }
					],
					responses: {
						'204': { description: 'User deleted' },
						'404': { description: 'User not found' }
					}
				}
			},
			'/portfolios': {
				get: {
					tags: ['Portfolios'],
					operationId: 'listPortfolios',
					summary: 'List portfolios',
					description: 'Returns all portfolios for the authenticated user.',
					responses: {
						'200': {
							description: 'Portfolio list',
							content: {
								'application/json': {
									schema: {
										type: 'array',
										items: { $ref: '#/components/schemas/Portfolio' }
									}
								}
							}
						}
					}
				}
			},
			'/portfolios/{portfolioId}': {
				get: {
					tags: ['Portfolios'],
					operationId: 'getPortfolio',
					summary: 'Get portfolio details',
					parameters: [
						{ name: 'portfolioId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }
					],
					responses: {
						'200': {
							description: 'Portfolio details with positions',
							content: {
								'application/json': {
									schema: { $ref: '#/components/schemas/Portfolio' }
								}
							}
						},
						'404': { description: 'Portfolio not found' }
					}
				}
			},
			'/orders': {
				get: {
					tags: ['Orders'],
					operationId: 'listOrders',
					summary: 'List orders',
					description: 'Returns a paginated list of orders with optional status filtering.',
					parameters: [
						{ name: 'status', in: 'query', schema: { type: 'string', enum: ['pending', 'filled', 'cancelled', 'rejected'] }, description: 'Filter by status' },
						{ name: 'symbol', in: 'query', schema: { type: 'string' }, description: 'Filter by trading pair' },
						{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
						{ name: 'limit', in: 'query', schema: { type: 'integer', default: 50 } }
					],
					responses: {
						'200': {
							description: 'Order list',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											data: {
												type: 'array',
												items: { $ref: '#/components/schemas/Order' }
											},
											meta: { $ref: '#/components/schemas/PaginationMeta' }
										}
									}
								}
							}
						}
					}
				},
				post: {
					tags: ['Orders'],
					operationId: 'placeOrder',
					summary: 'Place an order',
					description: 'Submit a new trading order. Supports market and limit order types.',
					requestBody: {
						required: true,
						content: {
							'application/json': {
								schema: {
									type: 'object',
									required: ['symbol', 'side', 'type', 'quantity'],
									properties: {
										symbol: { type: 'string', example: 'BTC/USD' },
										side: { type: 'string', enum: ['buy', 'sell'] },
										type: { type: 'string', enum: ['market', 'limit'] },
										quantity: { type: 'number', example: 0.5 },
										price: { type: 'number', description: 'Required for limit orders', example: 44000.00 }
									}
								}
							}
						}
					},
					responses: {
						'201': {
							description: 'Order placed',
							content: {
								'application/json': {
									schema: { $ref: '#/components/schemas/Order' }
								}
							}
						},
						'400': { description: 'Invalid order parameters' },
						'422': { description: 'Insufficient balance' }
					}
				}
			},
			'/orders/{orderId}': {
				delete: {
					tags: ['Orders'],
					operationId: 'cancelOrder',
					summary: 'Cancel an order',
					description: 'Cancel a pending order. Filled orders cannot be cancelled.',
					parameters: [
						{ name: 'orderId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }
					],
					responses: {
						'200': {
							description: 'Order cancelled',
							content: {
								'application/json': {
									schema: { $ref: '#/components/schemas/Order' }
								}
							}
						},
						'400': { description: 'Order cannot be cancelled' },
						'404': { description: 'Order not found' }
					}
				}
			},
			'/market/ticker/{symbol}': {
				get: {
					tags: ['Market Data'],
					operationId: 'getTicker',
					summary: 'Get ticker price',
					description: 'Returns the latest price and 24h stats for a trading pair.',
					parameters: [
						{ name: 'symbol', in: 'path', required: true, schema: { type: 'string' }, example: 'BTC/USD' }
					],
					responses: {
						'200': {
							description: 'Ticker data',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											symbol: { type: 'string' },
											price: { type: 'number' },
											change24h: { type: 'number' },
											volume24h: { type: 'number' },
											high24h: { type: 'number' },
											low24h: { type: 'number' },
											timestamp: { type: 'string', format: 'date-time' }
										}
									}
								}
							}
						}
					}
				}
			}
		},
		components: {
			schemas: {
				User: {
					type: 'object',
					properties: {
						id: { type: 'string', format: 'uuid' },
						name: { type: 'string' },
						email: { type: 'string', format: 'email' },
						role: { type: 'string', enum: ['admin', 'trader', 'viewer'] },
						createdAt: { type: 'string', format: 'date-time' }
					}
				},
				Portfolio: {
					type: 'object',
					properties: {
						id: { type: 'string', format: 'uuid' },
						name: { type: 'string' },
						totalValue: { type: 'number' },
						dailyPnl: { type: 'number' },
						positions: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									symbol: { type: 'string' },
									quantity: { type: 'number' },
									avgEntry: { type: 'number' },
									currentPrice: { type: 'number' },
									pnl: { type: 'number' }
								}
							}
						}
					}
				},
				Order: {
					type: 'object',
					properties: {
						id: { type: 'string', format: 'uuid' },
						symbol: { type: 'string' },
						side: { type: 'string', enum: ['buy', 'sell'] },
						type: { type: 'string', enum: ['market', 'limit'] },
						quantity: { type: 'number' },
						price: { type: 'number' },
						status: { type: 'string', enum: ['pending', 'filled', 'cancelled', 'rejected'] },
						filledAt: { type: 'string', format: 'date-time' },
						createdAt: { type: 'string', format: 'date-time' }
					}
				},
				PaginationMeta: {
					type: 'object',
					properties: {
						page: { type: 'integer' },
						limit: { type: 'integer' },
						total: { type: 'integer' },
						totalPages: { type: 'integer' }
					}
				}
			}
		}
	} as unknown as OpenAPI.Document;
</script>

<div class="h-[calc(100dvh-12rem)] min-h-[400px]">
	<OpenApiViewer {spec} />
</div>
