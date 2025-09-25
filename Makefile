.PHONY: help build up down logs clean dev dev-down dev-logs

# Default target
help:
	@echo "Available commands:"
	@echo "  build     - Build all Docker images"
	@echo "  up        - Start production environment"
	@echo "  down      - Stop production environment"
	@echo "  logs      - View production logs"
	@echo "  clean     - Clean up containers and volumes"
	@echo "  dev       - Start development environment"
	@echo "  dev-down  - Stop development environment"
	@echo "  dev-logs  - View development logs"

# Production commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

# Development commands
dev:
	docker-compose -f docker-compose.dev.yml up --build

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Cleanup
clean:
	docker-compose down -v
	docker system prune -f